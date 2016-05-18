'use strict';

/**
 * @ngdoc function
 * @name ngdeployApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the ngdeployApp
 */
angular.module('ngdeployApp')
    .controller('AccountCtrl', function(DEBUG,$scope, $http,$state, stripe,userService,sweet,dbUser) {
      $scope.user = dbUser;

      $scope.cards = [];

       userService.cards.get().then(function(cards){
         $scope.cards = cards.data;
       })
      if (DEBUG) {
        $scope.payment = {
          number : "4242424242424242",
          exp_year : 17,
          exp_month:10,
          csv : 1234
        }
        //code
      }
      $scope.newAccountToken = function(){
        sweet.show({
          title: 'Delete Account Token',
          text: 'Delete this account token and create a new one?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes please!',
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            userService.tokens.post().then(function (res) {
              console.log(res);
              localStorage.removeItem('token');
              localStorage.setItem('token',res);
              sweet.show('Created!', 'New account token has been created');
              $state.go($state.current, {}, {reload: true});
            });

          } else {
            sweet.show('Cancelled', 'Nothing changed', 'error');
          }
        });
      }
        $scope.subscribe = function(form) {
          if (!$scope.payment) {
            return false;
          }
          var valid = stripe.card.validateCardNumber($scope.payment.number);



           stripe.card.createToken($scope.payment)
                .then(function(response) {

                  userService.cards.post({
                    stripeToken:response.id,
                    debug:true
                  }).then(function(response){
                    sweet.show('Card added!', 'Card has been added to your account..', 'success');

                    console.log(response);

                  })

                }, function(error){
                  console.log(error);
                });
        }

    });
