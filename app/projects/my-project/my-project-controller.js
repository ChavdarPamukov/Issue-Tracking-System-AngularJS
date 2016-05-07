'use strict';

angular.module('issueTrackingSystem.my-project.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/my', {
                templateUrl: 'app/projects/my-project/my-project.html',
                controller: 'MyProjectsCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('MyProjectsCtrl', [
        '$scope',
        'projects',
        'PAGE_SIZE',
        'notificationService',
        function ($scope, projects, PAGE_SIZE, notificationService) {
            $scope.myProjectsParams = {
                pageSize: PAGE_SIZE,
                pageNumber: 1
            };

            $scope.getMyProjects = function () {
                projects.getUserProjects($scope.myProjectsParams)
                    .then(function success(data) {
                        $scope.myProjects = data.Projects;
                        $scope.myTotalProjects = data.TotalCount;
                    }, function error() {
                        notificationService.showError('Unable to get user projects.', err);
                    });
            };

            $scope.getMyProjects();
        }]);
