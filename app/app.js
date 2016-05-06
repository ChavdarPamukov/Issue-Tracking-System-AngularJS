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
        'issueTrackingSystem.add-project',
        'issueTrackingSystem.my-project',
        'issueTrackingSystem.view-project-page',
        'issueTrackingSystem.edit-project',
        'issueTrackingSystem.services.comments',
        'issueTrackingSystem.issue-view-page',
        'issueTrackingSystem.add-issue',
        'issueTrackingSystem.edit-issue'
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