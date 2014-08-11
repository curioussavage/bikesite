'use strict';



angular.module('newMotoApp')
  .controller('SearchCtrl', function ($rootScope, $scope, adds, makeAndModel, Search, $modal) {
        $scope.makesAndModels = makeAndModel.makesAndModels;

        $scope.search = {};

        $scope.searchresults = adds;
//        console.log($scope.searchresults);


        $scope.searchDatabase = function (search) {
//            console.log("searchDatabase called");
            Search.searchAdds(search).then(function(data){
                console.log(data)
                $scope.searchresults = data;


            });

        };




        var myOtherModal = $modal({scope: $scope, template: '../../views/modal.html', show: false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)
        $scope.toggleModal = function(result) {
            $scope.modalResult = result;

            myOtherModal.$promise.then(myOtherModal.show);
            console.log($scope.modalResult)
        };


//      Favorite adds logic       //
        Storage.prototype.setObject = function(key, value) {
            this.setItem(key, JSON.stringify(value));
        };

        Storage.prototype.getObject = function(key) {
            var value = this.getItem(key);
            return value && JSON.parse(value);
        };


        $scope.favs =  [];

        if ($rootScope.currentUser) {
            Search.getFavs($rootScope.currentUser.id).then(function(data){
                for (var i = 0; i < data.length ; i++) {
                    $scope.favs.push(data[i])
                }
            })
        } else {
            if(!window.localStorage.getItem('favs')) {
                window.localStorage.setObject('favs', $scope.favs)
            } else {
                $scope.favs = window.localStorage.getObject('favs')
                }
        }






        $scope.addFav = function(favs) {
            $scope.favs.push($scope.modalResult);
            if ($rootScope.currentUser){
                Search.postFav($scope.modalResult._id).then(function(data) {
                    console.log(data);
                })
            } else {
                if(!window.localStorage.getObject('favs')) {
                    window.localStorage.setObject('favs', $scope.favs)
                } else {window.localStorage.setObject('favs', $scope.favs)}
            }

        };

        $scope.removeFav = function (id) {
//            console.log(this)
            $scope.favs.splice(this.$index, 1)
            if ($rootScope.currentUser) {
                Search.removeFav(id).then(function () {

                })
            } else {if(!window.localStorage.getObject('favs')) {
                    window.localStorage.setObject('favs', $scope.favs)
                } else {window.localStorage.setObject('favs', $scope.favs)}

            }
        }



  });


