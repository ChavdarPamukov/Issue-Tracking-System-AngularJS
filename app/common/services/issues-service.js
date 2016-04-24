'use strict';

angular.module('issueTrackingSystem.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL) {
        function getMyIssues(criteria, params) {
            var deferred = $q.defer();

            var req = {
                method: 'GET',
                url: BASE_URL + 'issues/me?orderBy=' + criteria + ' desc&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber,
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
                }
            };

            $http(req)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getUserIssues: getMyIssues
        }
    }]);