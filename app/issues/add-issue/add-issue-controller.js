'use strict';

angular.module('issueTrackingSystem.add-issue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/add-issue/:id', {
                templateUrl: 'app/issues/add-issue/add-issue.html',
                controller: 'AddIssueToProjectCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('AddIssueToProjectCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'projects',
        'notificationService',
        function ($scope, $routeParams, $location, projects, notificationService) {
            $scope.allUsers();

            projects.getProjectById($routeParams.id)
                .then(function success(data) {
                    $scope.projectPriorities = data.Priorities;
                });

            $scope.addIssueToProject = function (issueToAdd) {

                var issueToSend = {
                    Title: issueToAdd.Title,
                    Description: issueToAdd.Description,
                    DueDate: issueToAdd.DueDate,
                    ProjectId: $routeParams.id,
                    AssigneeId: issueToAdd.AssigneeId,
                    PriorityId: issueToAdd.PriorityId,
                    Labels: issueToAdd.Labels.split(',')
                };

                projects.addIssueToProject(issueToSend)
                    .then(function success(data) {
                        $location.path('projects/' + data.Project.Id)
                    }, function error(err) {
                        notificationService.showError('Unable to add issue', err);
                    });
            };
        }]);