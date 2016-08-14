'use strict';

/**
 * @ngdoc function
 * @name ngdeployApp.controller:LogsCtrl
 * @description
 * # LogsCtrl
 * Controller of the ngdeployApp
 */
angular.module('ngdeployApp')
  .controller('LogsCtrl', function ($scope,logs,appObject,$state) {
    $scope.app = appObject;
    $scope.logs = logs;
    $scope.refresh = function(){
      $state.reload();

    };

  });
