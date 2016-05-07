'use strict';

angular.module('issueTrackingSystem.view-project-page.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/:id', {
                templateUrl: 'app/projects/view-project-page/view-project-page.html',
                controller: 'ViewProjectsPageCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('ViewProjectsPageCtrl', [
        '$scope',
        '$routeParams',
        'projects',
        'issues',
        'notificationService',
        function ($scope, $routeParams, projects, issues, notificationService) {

            projects.getProjectById($routeParams.id)
                .then(function success(data) {
                    $scope.currentProject = data;

                    if (data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                        $scope.isLeadOfProject = true;
                    } else {
                        $scope.isLeadOfProject = false;
                    }

                    $scope.currentProjectLabels = [];
                    $scope.currentProjectPriorities = [];

                    data.Labels.forEach(function (l) {
                        $scope.currentProjectLabels.push(l.Name);
                    });

                    data.Priorities.forEach(function (p) {
                        $scope.currentProjectPriorities.push(p.Name);
                    });
                }, function error(err) {
                    notificationService.showError('Unable to get project', err);
                });

            issues.getIssues($routeParams.id)
                .then(function success(issuesData) {
                    $scope.currentProjectIssues = issuesData;
                    $scope.currentProjectIssuesAssignees = [];
                    $scope.currentProjectIssuesPriorities = [];

                    issuesData.forEach(function (issue) {

                        if ($scope.currentProjectIssuesAssignees.indexOf(issue.Assignee.Username) === -1) {
                            $scope.currentProjectIssuesAssignees.push(issue.Assignee.Username);
                        }

                        if ($scope.currentProjectIssuesPriorities.indexOf(issue.Priority.Name) === -1) {
                            $scope.currentProjectIssuesPriorities.push(issue.Priority.Name);
                        }
                    });
                }, function error(err) {
                    notificationService.showError('Unable to get issues', err);
                });
        }]);
