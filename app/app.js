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
        'issueTrackingSystem.home',
        'issueTrackingSystem.common',
        'issueTrackingSystem.change-password',
        'issueTrackingSystem.all-projects',
        'issueTrackingSystem.add-project',
        'issueTrackingSystem.my-project',
        'issueTrackingSystem.view-project-page',
        'issueTrackingSystem.edit-project',
        'issueTrackingSystem.issue-view-page',
        'issueTrackingSystem.edit-issue',
        'issueTrackingSystem.add-issue'
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
    .constant('PAGE_SIZE', 5)
    .run([
        '$rootScope',
        '$location',
        'authentication',
        function ($rootScope, $location, authentication) {
            $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
                if (nextRoute.access) {
                    if (nextRoute.access.requiresLogin && !authentication.isAuthenticated()) {
                        $location.path('/');
                    }

                    if (nextRoute.access.requiresAdmin && !authentication.isAdmin()) {
                        $location.path('/');
                    }
                } else {
                    $location.path('/');
                }
            });
        }]);
