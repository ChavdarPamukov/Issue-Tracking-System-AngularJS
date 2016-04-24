'use strict';

angular.module('issueTrackingSystem.home', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/home/template/home.html',
                controller: 'HomeCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        'issues',
        'notificationService',
        'PAGE_SIZE',
        function($scope, $location, authentication, issues, notificationService, pageSize) {
            $scope.issuesParams = {
                pageSize: pageSize,
                pageNumber: 1
            };

            $scope.register = function(user) {
                authentication.registerUser(user)
                    .then(function success() {
                        notificationService.showSuccess('User registered successfully!');
                        $scope.login(user);
                    }, function error(err) {
                        notificationService.showError('Registration failed!', err);
                    });
            };

            $scope.login = function(user) {
                authentication.loginUser(user)
                    .then(function success(userData) {
                        $scope.getUserIssues();
                        notificationService.showSuccess('User logged in successfully!');
                    }, function error(err) {
                        notificationService.showError('Login failed!', err);
                    });
            };

            $scope.getUserIssues = function(predicate) {
                var criteria = predicate || 'DueDate';

                if(authentication.isAuthenticated()) {
                    issues.getUserIssues(criteria, $scope.issuesParams)
                        .then(function success(data) {
                            $scope.userIssues = data.Issues;
                            $scope.userIssuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                        }, function error(err) {
                            notificationService.showError('Unable to get issues', err);
                        });
                }
            };

            $scope.getUserIssues();
        }]);