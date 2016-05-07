'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ui.bootstrap.pagination',
        'issueTrackingSystem.service.authentication',
        'issueTrackingSystem.service.users',
        'issueTrackingSystem.service.notification',
        'issueTrackingSystem.service.projects',
        'issueTrackingSystem.service.issues',
        'issueTrackingSystem.services.comments',
        'issueTrackingSystem.directive.templates',
        'issueTrackingSystem.home.controller',
        'issueTrackingSystem.common.controller',
        'issueTrackingSystem.change-password.controller',
        'issueTrackingSystem.all-projects.controller',
        'issueTrackingSystem.add-project.controller',
        'issueTrackingSystem.my-project.controller',
        'issueTrackingSystem.view-project-page.controller',
        'issueTrackingSystem.edit-project.controller',
        'issueTrackingSystem.issue-view-page.controller',
        'issueTrackingSystem.edit-issue.controller',
        'issueTrackingSystem.add-issue.controller'
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
