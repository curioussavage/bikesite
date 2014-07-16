'use strict';



angular.module('newMotoApp')
  .controller('SearchCtrl', function ($scope, adds, makeAndModel, Search, $modal) {
        $scope.makesAndModels = makeAndModel.makesAndModels;

        $scope.search = {};

        $scope.searchresults = adds;
        console.log($scope.searchresults);

        $scope.searchDatabase = function (search) {
            console.log("searchDatabase called");
            Search.searchAdds(search).then(function(data){
                console.log(data)
                $scope.searchresults = data;   // data is being attached just fine but the ng-repeat is not iterating through it again.


            });

        };




        var myOtherModal = $modal({scope: $scope, template: '../../views/modal.html', show: false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)
        $scope.toggleModal = function(result) {
            $scope.modalResult = result;

            myOtherModal.$promise.then(myOtherModal.show);
            console.log($scope.modalResult)
        };
//





  });


