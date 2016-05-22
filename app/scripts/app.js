window.GLOBALS = {
  "localhost": {
    STRIP_APIKEY: "pk_07bMnvtw1B0waY5ZG52Jmq8b3c8J8",
  },
  "ngdeploy.com": {
    STRIP_APIKEY: "pk_07bMpaLqyXyW6OUFVYsqpALSnavDH"

  }
};



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
  'ngclipboard',
  'blockUI',
  'angularMoment',
  'angular-stripe',
  'snapscroll',
  '720kb.tooltips',
  'ui.codemirror',
  'ui.select',
  'ngSanitize'

])
  .constant('API_ENDPOINT', 'https://api.ngdeploy.com')
  .constant('STRIP_APIKEY', window.GLOBALS[window.location.hostname].STRIP_APIKEY)
  .constant('OAUTH_KEY', 'eNUFQESkMZC0uSp5FtoVyrh1OQM')
  .constant('DEBUG', true)
  .config(function (STRIP_APIKEY, stripeProvider) {
    stripeProvider.setPublishableKey(STRIP_APIKEY);

  })
  .run(function (OAUTH_KEY, $window, $rootScope, $state) {

    if ($window.User.isLogged()) {
      var u = $window.User.getIdentity();
      $rootScope.user = u;
    }

    $rootScope.$on('USER::LOGIN', function (evt, data) {
      $rootScope.user = data;
    });
    $rootScope.$on('USER::LOGOUT', function (evt, data) {
      $rootScope.user = data;
    });

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        $state.go('public.home')
      });


    $window.OAuth.initialize(OAUTH_KEY);

  })
