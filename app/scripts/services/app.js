'use strict';

/**
 * @ngdoc service
 * @name ngdeployApp.app
 * @description
 * # app
 * Service in the ngdeployApp.
 */
angular.module('ngdeployApp')
    .service('appService', function(API_ENDPOINT, $q, $http, $base64) {
        var self = this;
        self.domains = {
            post: function(data) {
                var defer = $q.defer();

                $http.post(API_ENDPOINT + '/apps/domains', data).then(function(response) {
                    defer.resolve(response.data);

                }, function(response) {
                    defer.reject(response.data.error);

                });
                return defer.promise;
            }
        }
        self.ssls = {
            post: function(data) {
                var defer = $q.defer();


                $http.post(API_ENDPOINT + '/apps/ssls', data).then(function(response) {
                    defer.resolve(response.data);

                }, function(response) {
                    defer.reject(response.data.error);

                });
                return defer.promise;
            }
        }

        self.get = function(page) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_ENDPOINT + '/apps'
            }).then(function(response) {
                defer.resolve(response.data);

            }, function(response) {
                defer.reject(response);

            });
            return defer.promise;
        }
        self.fetch = function(appId) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: API_ENDPOINT + '/apps/'+appId
            }).then(function(response) {
                defer.resolve(response.data);

            }, function(response) {
                defer.reject(response);

            });
            return defer.promise;
        },

        self.refresh = function(appId) {
            var defer = $q.defer();
            $http({
              method: 'GET',
              url: API_ENDPOINT + '/apps/status'
            }).then(function(response) {
              defer.resolve(response.data);

            }, function(response) {
              defer.reject(response);

            });
            return defer.promise;
        }

        self.purge = function(data) {
            var defer = $q.defer();

            $http.post(API_ENDPOINT + '/apps/purges', data).then(function(response) {
                defer.resolve(response.data);

            }, function(response) {
                defer.reject(response.data.error);

            });
            return defer.promise;

        }


        self.post = function(data) {
            var defer = $q.defer();
            $http.post(API_ENDPOINT + '/apps', data).then(function(response) {
                defer.resolve(response.data);

            }, function errorCallback(response) {
                defer.reject(response.data.error);

            });
            return defer.promise;

        }
        self.promote = function(data) {
            var defer = $q.defer();
            $http.post(API_ENDPOINT + '/apps/promotes', data).then(function(response) {
                defer.resolve(response.data);

            }, function errorCallback(response) {
                defer.reject(response);

            });
            return defer.promise;

        }
        self.upgrade = function(id) {
            var defer = $q.defer();
            $http.post(API_ENDPOINT + '/apps/upgrades', {
                id: id
            }).then(function(response) {
                defer.resolve(response.data);

            }, function errorCallback(response) {
                defer.reject(response.data.error);

            });
            return defer.promise;

        }
        self.delete = function(appId) {
            var defer = $q.defer();
            $http.delete(API_ENDPOINT + '/apps/' + appId).then(function(response) {
                defer.resolve(response.data);

            }, function errorCallback(response) {
                defer.reject(response.data.error);

            });
            return defer.promise;

        }



        return self;


    });
