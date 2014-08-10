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
        $scope.favs =  [];


        Search.getFavs($rootScope.currentUser.id).then(function(data){
            for (var i = 0; i < data.length ; i++) {
                $scope.favs.push(data[i])
            }
        })





        $scope.addFav = function(favs) {
            $scope.favs.push($scope.modalResult);
            Search.postFav($scope.modalResult._id).then(function(data) {
                console.log(data);
            })

        };

        $scope.removeFav = function (id){
//            console.log(this)
            $scope.favs.splice(this.$index, 1)
            Search.removeFav(id).then(function(){

            })
        }



  });


