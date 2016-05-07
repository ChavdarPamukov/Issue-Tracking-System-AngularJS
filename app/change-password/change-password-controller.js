'use strict';

angular.module('issueTrackingSystem.change-password.controller', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/profile/password', {
                templateUrl: 'app/change-password/template/change-password.html',
                controller: 'ChangePasswordCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('ChangePasswordCtrl', [
        '$scope',
        '$location',
        'authentication',
        'users',
        'notificationService',
        function($scope, $location, authentication, users, notificationService) {

            $scope.changePassword = function(user) {
                authentication.changePassword(user)
                    .then(function success() {
                        notificationService.showSuccess('Password changed successfully!');
                        $location.path('/');
                    }, function error(err) {
                        notificationService.showError('Failed to change password.', err);
                    });
            };

        }]);