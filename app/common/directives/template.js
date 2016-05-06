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
    }])
    .directive('ngIssueCommentForm', [function() {
        return {
            restrict: 'A',
            templateUrl: 'app/issues/issue-comments/add-issue-comment.html'
        }
    }])
    .directive('ngIssueComments', [function() {
        return {
            restrict: 'A',
            templateUrl: 'app/issues/issue-comments/issue-comments.html'
        }
    }])
    .directive('ngIssueFilter', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/issues/issue-filter/issue-filter.html'
        }
    }]);