angular.module('issueTrackingSystem.templates', [])
    .directive('ngHeader', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/template/header.html'
        }
    }])
    .directive('ngLoginUserForm', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/template/login.html'
        }
    }])
    .directive('ngRegisterUserForm', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/template/register.html'
        }
    }])
    .directive('ngDashboard', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/template/dashboard.html'
        }
    }]);