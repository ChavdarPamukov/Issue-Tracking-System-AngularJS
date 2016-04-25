'use strict';

angular.module('issueTrackingSystem.common', [])

    .controller('CommonCtrl', [
        '$scope',
        '$location',
        'authentication',
        'users',
        'notificationService',
        function ($scope, $location, authentication, users, notificationService) {

            $scope.isAuthenticated = function () {
                return authentication.isAuthenticated();
            };

            $scope.isAdmin = function () {
                return authentication.isAdmin();
            };

            $scope.logout = function () {
                authentication.logoutUser()
                    .then(function success() {
                        sessionStorage.clear();
                        notificationService.showSuccess('User logged out successfully');
                        $location.path('/');
                    }, function error(err) {
                        notificationService.showError('Unsuccessful logout', err);
                    });
            };

            $scope.allUsers = function () {
                users.getAllUsers()
                    .then(function success(response) {
                        $scope.users = response;
                    }, function error(err) {
                        notificationService.showError('Unable to get all users', err)
                    });
            }
        }]);