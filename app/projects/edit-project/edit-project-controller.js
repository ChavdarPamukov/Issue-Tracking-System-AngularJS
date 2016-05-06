'use strict';

angular.module('issueTrackingSystem.edit-project', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/edit/:id', {
                templateUrl: 'app/projects/edit-project/edit-project.html',
                controller: 'EditProjectsCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('EditProjectsCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'projects',
        'notificationService',
        function ($scope, $routeParams, $location, projects, notificationService) {

            $scope.allUsers();

            function getArrayOfStrings(str) {
                return str.split(',');
            }

            projects.getProjectById($routeParams.id)
                .then(function success(data) {
                    $scope.currentProject = data;

                    $scope.currentProjectLabels = [];
                    $scope.currentProjectPriorities = [];

                    data.Labels.forEach(function (l) {
                        $scope.currentProjectLabels.push(l.Name);
                    });

                    data.Priorities.forEach(function (p) {
                        $scope.currentProjectPriorities.push(p.Name);
                    });

                    if (data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                        $scope.isLeadOfProject = true;
                    } else {
                        $scope.isLeadOfProject = false;
                    }

                }, function error(err) {
                    notificationService.showError('Unable to get project', err);
                });

            $scope.editProject = function () {
                if (typeof $scope.currentProjectLabels === 'string') {
                    $scope.currentProjectLabels = getArrayOfStrings($scope.currentProjectLabels);
                }
                if (typeof $scope.currentProjectPriorities === 'string') {
                    $scope.currentProjectPriorities = getArrayOfStrings($scope.currentProjectPriorities);
                }

                var projectForEdit = {
                    Name: $scope.currentProject.Name,
                    Description: $scope.currentProject.Description,
                    Priorities: $scope.currentProjectPriorities,
                    Labels: $scope.currentProjectLabels,
                    LeadId: $scope.currentProject.Lead.Id
                };

                projects.editProject(projectForEdit, $routeParams.id)
                    .then(function success(data) {
                        $location.path('projects/' + data.Id)
                    }, function error(err) {
                        notificationService.showError('Unable to edit project', err);
                    });
            };
        }]);
