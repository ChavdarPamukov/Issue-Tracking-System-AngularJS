'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.login-register'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
