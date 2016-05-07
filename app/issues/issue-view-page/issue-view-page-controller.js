'use strict';

angular.module('issueTrackingSystem.issue-view-page.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/issues/:id', {
                templateUrl: 'app/issues/issue-view-page/issue-view-page.html',
                controller: 'ViewIssueCtrl',
                access: {
                    requiresLogin: true
                }
            })
    }])
    .controller('ViewIssueCtrl', [
        '$scope',
        '$routeParams',
        'issues',
        'comments',
        'projects',
        'notificationService',
        function ($scope, $routeParams, issues, comments, projects, notificationService) {
            $scope.issueComment = {};

            $scope.getIssueById = function () {
                issues.getIssueById($routeParams.id)
                    .then(function success(data) {
                        $scope.currentIssue = data;

                        if (data.Assignee.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                            $scope.isAssignee = true;
                        } else {
                            $scope.isAssignee = false;
                        }

                        $scope.currentIssueLabels = [];

                        data.Labels.forEach(function (label) {
                            $scope.currentIssueLabels.push(label.Name);
                        });

                        projects.getProjectById(data.Project.Id)
                            .then(function success(data) {
                                if (data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                                    $scope.isLeadOfProject = true;
                                } else {
                                    $scope.isLeadOfProject = false;
                                }
                            });

                    }, function error(err) {
                        notificationService.showError('Unable to get issue', err);
                    });
            };

            $scope.changeStatus = function (statusId) {
                issues.changeStatus($routeParams.id, statusId)
                    .then(function () {
                        $scope.getIssueById();
                    }, function error(err) {
                        notificationService.showError('Unable to change status', err);
                    });
            };

            $scope.getIssueComments = function () {
                comments.getIssueComments($routeParams.id)
                    .then(function success(data) {
                        $scope.issueComments = data;
                    }, function error(err) {
                        notificationService.showError('Unable to get comments', err);
                    });
            };

            $scope.addComment = function (comment) {
                comments.addCommentToIssue($routeParams.id, comment)
                    .then(function success(data) {
                        $scope.issueComments = data;
                        $scope.issueComment.Text = '';
                    }, function error(err) {
                        notificationService.showError('Unable to add comment', err);
                    });
            };

            $scope.getIssueById();
            $scope.getIssueComments();

        }]);
