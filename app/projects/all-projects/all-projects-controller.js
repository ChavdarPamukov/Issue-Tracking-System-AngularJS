'use strict';

angular.module('issueTrackingSystem.all-projects.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects', {
                templateUrl: 'app/projects/all-projects/all-projects.html',
                controller: 'AllProjectsCtrl',
                access: {
                    requiresAdmin: true
                }
            })
    }])
    .controller('AllProjectsCtrl', [
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

            $scope.getAllProjects = function () {
                projects.getAllProjects($scope.projectsParams)
                    .then(function success(data) {
                        $scope.allProjects = data.Projects;
                        $scope.projectsCount = data.TotalPages * $scope.projectsParams.pageSize;
                    }, function error(err) {
                        notificationService.showError('Unable to get projects', err);
                    });
            };

            $scope.getAllProjects();
        }]);
