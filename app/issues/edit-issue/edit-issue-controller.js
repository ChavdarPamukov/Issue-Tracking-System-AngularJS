'use strict';

angular.module('issueTrackingSystem.edit-issue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/issues/edit/:id', {
                templateUrl: 'app/issues/edit-issue/edit-issue.html',
                controller: 'EditIssueCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])

    .controller('EditIssueCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'issues',
        'projects',
        'notificationService',
        function ($scope, $routeParams, $location, issues, projects, notificationService) {
            $scope.allUsers();

            issues.getIssueById($routeParams.id)
                .then(function success(data) {
                    $scope.currentIssue = data;
                    $scope.currentIssueDueDateLocal = new Date(data.DueDate);
                    $scope.issuePriority = data.Priority.Id;
                    $scope.currentIssueLabels = [];

                    data.Labels.forEach(function (label) {
                        $scope.currentIssueLabels.push(label.Name);
                    });

                    projects.getProjectById(data.Project.Id)
                        .then(function success(data) {
                            $scope.projectPriorities = data.Priorities;

                            if (data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                                $scope.isLeadOfProject = true;
                            } else {
                                $scope.isLeadOfProject = false;
                            }
                        });
                }, function error(err) {
                    notificationService.showError('Unable to get issue', err);
                });

            $scope.editIssue = function () {
                if (typeof $scope.currentIssueLabels === 'string') {
                    $scope.currentIssueLabels = $scope.currentIssueLabels.split(',');
                }

                var issueToEdit = {
                    Title: $scope.currentIssue.Title,
                    Description: $scope.currentIssue.Description,
                    DueDate: $scope.currentIssueDueDateLocal,
                    AssigneeId: $scope.currentIssue.Assignee.Id,
                    PriorityId: $scope.issuePriority,
                    Labels: $scope.currentIssueLabels
                };

                issues.editIssue(issueToEdit, $routeParams.id)
                    .then(function success(data) {
                        $location.path('issues/' + data.Id);
                    }, function error(err) {
                        notificationService.showError('Unable to edit issue', err);
                    });
            };
        }]);
