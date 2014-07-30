'use strict';

angular.module('newMotoApp')
  .service('Sell', function Sell($http, $q) {



        return {
            postAdd: function(listing){
                console.log(listing);



                var deferred = $q.defer();

                $http.post('http://localhost:9000/listing', listing)  //   http://www.utahmotomarket.com for local host
                    .success(function(data){
                        deferred.resolve(data);

                    });



                return deferred.promise;
            }



        }


     });
