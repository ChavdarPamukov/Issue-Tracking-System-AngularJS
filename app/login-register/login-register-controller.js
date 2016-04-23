'use strict';

angular.module('issueTrackingSystem.login-register', [
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/login-register/login-register.html',
            controller: 'loginRegisterCtrl'
        });
    }])
    .controller('loginRegisterCtrl', [
        '$scope',


        function($scope) {

        }]);

