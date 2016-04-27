'use strict';

angular.module('issueTrackingSystem.add-project', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/add', {
                templateUrl: 'app/projects/add-project/add-project.html',
                controller: 'AddProjectsCtrl',
                access: {
                    requiresAdmin: true
                }
            })
    }])
    .controller('AddProjectsCtrl', [
        '$scope',
        '$location',
        'projects',
        'notificationService',
        'PAGE_SIZE',
        function ($scope, $location, projects, notificationService, PAGE_SIZE) {
            $scope.projectsParams = {
                pageSize: PAGE_SIZE,
                pageNumber: 1
            };

            $scope.allUsers();

            $scope.addProject = function (project) {
                projects.addProject(project)
                    .then(function success(data) {
                        $location.path('projects/' + data.Id);
                    }, function error(err) {
                        notificationService.showError('Unable to add project', err);
                    });
            };
        }]);
