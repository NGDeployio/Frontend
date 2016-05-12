'use strict';

/**
 * @ngdoc service
 * @name ngdeployApp.git
 * @description
 * # git
 * Service in the ngdeployApp.
 */
angular.module('ngdeployApp')
  .service('git',  function(API_ENDPOINT, $q, $http, userService){

    var self = this;

    self.listRepos = function listRepos(){

      var defer = $q.defer();

      userService.self().then(function(user){

        console.log("ME ",user);

        /// Grab REPOS  ///

        $http({
          method:"GET",
          url: "https://api.github.com/user/repos",
          headers:{
            Authorization: "token " + user.GitHubAccessToken,
            "Content-Type": "application/json"
          }
        }).then(function(resp){
            defer.resolve(resp.data);
        }, function err(resp){
          console.log("There was an error grabbing repositories." , arguments);
          defer.reject(resp);
        });
        ///// Grab REPOS  ////
      });

      return defer.promise;
    };

    self.hookIt = function hookIt(repo) {
      var defer = $q.defer();
      userService.self().then(function (user) {
        $http({
          method: "POST",
          url: repo['hooks_url'],
          data: {
            name: "web",
            active: true,
            events: ["push"],
            config: {
              url: API_ENDPOINT + "/payload",
              content_type: "json"
            }
          },
          headers: {
            Authorization: "token " + user.GitHubAccessToken,
            "Content-Type": "application/json"
          }
        }).then(function (resp) {
          console.log("Successfully hooked ", arguments);
          defer.resolve(resp);
        }, function err() {
          console.log("There was an error hooking", arguments);
          defer.reject(resp);
        });
        /// \SET HOOK   ////}

        return defer.promise;

      })
    }

    return self;
  });
