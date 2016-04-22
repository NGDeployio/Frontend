'use strict';

/**
 * @ngdoc overview
 * @name ngdeployApp
 * @description
 * # ngdeployApp
 *
 * Main module of the application.
 */
angular.module('ngdeployApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'angularMoment',
    'ui.router',
    'angular-jwt',
    'ui.bootstrap',
    'base64',
    'hSweetAlert',
    'ngclipboard'
])
    .constant('API_ENDPOINT', 'https://api.ngdeploy.com')
    .run(function($window, $rootScope, $state) {
        $rootScope.$on('USER::LOGIN', function(evt, data) {
            $rootScope.user = data;
        });
        $rootScope.$on('USER::LOGOUT', function(evt, data) {
            $rootScope.user = data;
        });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                $state.go('public.home')
            });



        $window.OAuth.initialize('eNUFQESkMZC0uSp5FtoVyrh1OQM');

    })