'use strict';

angular.module('newMotoApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, Sell, makeAndModel) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};

        // imported from sell controller in original app
        $scope.makesAndModels = makeAndModel.makesAndModels;
//    $scope.postedAdd = post
        $scope.listing = {};
        $scope.listing.images = [];

        Auth.currentUser().$promise.then(function(user){
//            console.log('The current user ID is:', user._id);
            $scope.listing.user = user._id;
            console.log($scope.listing);
        });

//
//            $scope.listing.user = x._id;
//            console.log(x)
//



        $scope.submit = function () {

            Sell.postAdd($scope.listing);

        };

    $scope.togglePass = function() {
        if ($scope.changePass == true) {
            $scope.changePass = false;
        } else {
            $scope.changePass = true;

        }

    }


  });
