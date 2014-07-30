'use strict';

angular.module('newMotoApp')
  .service('Sell', function Sell($http, $q) {



        return {
            postAdd: function(listing){
                console.log(listing);



                var deferred = $q.defer();

                $http.post('http://www.utahmotomarket.com/listing', listing)  // for local host
                    .success(function(data){
                        deferred.resolve(data);

                    });



                return deferred.promise;
            }



        }


     });
