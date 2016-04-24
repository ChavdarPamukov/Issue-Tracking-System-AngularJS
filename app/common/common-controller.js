'use strict';

angular.module('issueTrackingSystem.common', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/profile/password', {
                templateUrl: 'app/home/template/change-password.html',
                controller: 'CommonCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('CommonCtrl', [
        '$scope',
        '$location',
        'authentication',
        'users',
        'notificationService',
        function($scope, $location, authentication, users, notificationService) {

            $scope.isAuthenticated = function() {
                return authentication.isAuthenticated();
            };

            $scope.isAdmin = function() {
                return authentication.isAdmin();
            };

            $scope.logout = function() {
                // TODO
            };

            $scope.changePassword = function(user) {
                // TODO
            };

            $scope.allUsers = function() {
                users.getAllUsers()
                    .then(function success(response) {
                        $scope.users = response;
                    }, function error(err) {
                        notificationService.showError('Unable to get all users', err)
                    });
            }
        }]);