'use strict';

/**
 * @ngdoc service
 * @name ngdeployApp.userService
 * @description
 * # userService
 * Service in the ngdeployApp.
 */
angular.module('ngdeployApp')
  .service('userService', function (DEBUG,API_ENDPOINT, $q, $http, stripe,STRIP_APIKEY) {
    var self = this;
    self.getToken = function (postData) {
      var defer = $q.defer();
      $http.post(API_ENDPOINT + '/tokens', postData).then(function (success) {
        defer.resolve(success.data.response);
      }, function (error) {
        defer.resolve(error.response);
      });
      return defer.promise;
    };
    self.tokens = {
      post: function () {
        var defer = $q.defer();

        $http.post(API_ENDPOINT + '/users/tokens').then(function (success) {
          defer.resolve(success.data.response);
        }, function (error) {
          defer.resolve(error.response);
        });
        return defer.promise;
      }
    };
    self.cards = {
      post: function (postData) {
        if(DEBUG) postData.DEBUG = true;

        var defer = $q.defer();
        $http.post(API_ENDPOINT + '/users/cards', postData).then(function (success) {
          defer.resolve(success.data.response);
        }, function (error) {
          defer.reject(error.data.error.message);
        });
        return defer.promise;
      },
      get: function () {
        var defer = $q.defer();
        var endpoint = API_ENDPOINT + '/users/cards';
        if(DEBUG) endpoint = endpoint+"?DEBUG=true";

        $http.get(endpoint).then(function (success) {
          defer.resolve(success.data.response);
        }, function (error) {
          defer.resolve(error.response);
        });
        return defer.promise;
      }
    };


    self.subscription = {
        get: function (){
          var defer = $q.defer();
          $http.get(API_ENDPOINT+"/users/subscriptions?DEBUG=true").then(function(success){
            defer.resolve(success.data.response);
          },function(error){
            defer.resolve(error.response);
          });
          return defer.promise;
        }
    };

    self.upgrade = function (planId) {
      var defer = $q.defer();



      var obj = {planId:planId};
      if(DEBUG) obj.DEBUG = true;

      $http.post(API_ENDPOINT + '/users/subscriptions',obj).then(function (success) {
        defer.resolve(success.data.response);
      }, function (error) {
        defer.resolve(error.response);
      });
      return defer.promise;
    };

    self.self = function () {
      var defer = $q.defer();
      $http.get(API_ENDPOINT + '/users/self').then(function (success) {
        defer.resolve(success.data.response);
      }, function (error) {
        defer.resolve(error.response);
      });
      return defer.promise;
    };


    return self;
  });
