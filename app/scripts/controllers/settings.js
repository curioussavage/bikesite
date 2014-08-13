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
        $scope.listing.zip = "";

        Auth.currentUser().$promise.then(function(user){
//            console.log('The current user ID is:', user._id);
            $scope.listing.user = user._id;
            console.log($scope.listing);

            $scope.getMyAdds(user._id)
        });





        $scope.submit = function () {

            Sell.confirmZip($scope.listing.zip).then(function(data){
                    console.log(data);
                $scope.listing.lat = data.zips.latitude;
                $scope.listing.long = data.zips.longitude;

                Sell.postAdd($scope.listing).then(Sell.getUserAdds($scope.listing.user))

            })




        };

    $scope.togglePass = function() {
        if ($scope.changePass == true) {
            $scope.changePass = false;
        } else {
            $scope.changePass = true;

        }

    }

    $scope.getMyAdds = function(id) {
        Sell.getUserAdds(id).then(function(data){
            console.log(data);
            $scope.Myadds = data;


        });
    }

    $scope.archiveAdd = function() {
        $scope.Myadds.splice(this.$index, 1);
        var id = this.add._id;
        Sell.archiveAdd(id);
    }




  });
