'use strict';

angular.module('issueTrackingSystem.view-project-page', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/:id', {
                templateUrl: 'app/projects/view-project-page/view-project-page.html',
                controller: 'ViewProjectsPageCtrl',
                access: {
                    requiresAdmin: true
                }
            })
    }])
    .controller('ViewProjectsPageCtrl', [
        '$scope',
        '$routeParams',
        'projects',
        'notificationService',
        function ($scope, $routeParams, projects, notificationService) {

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

        }]);