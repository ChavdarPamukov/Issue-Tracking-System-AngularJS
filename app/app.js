'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ui.bootstrap.pagination',
        'issueTrackingSystem.home',
        'issueTrackingSystem.common',
        'issueTrackingSystem.authentication',
        'issueTrackingSystem.users',
        'issueTrackingSystem.change-password',
        'issueTrackingSystem.issues',
        'issueTrackingSystem.notification',
        'issueTrackingSystem.templates',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.all-projects',
        'issueTrackingSystem.add-project'
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .otherwise(
                    {redirectTo: '/'}
                );
        }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('PAGE_SIZE', 5);