'use strict';

angular.module('newMotoApp')
  .service('Sell', function Sell($http, $q, Auth) {



        return {
            postAdd: function(listing){
                console.log(listing);


                var deferred = $q.defer();

                $http.post('http://www.utahmotomarket.com/listing', listing)  //   http://www.utahmotomarket.com for local host
                    .success(function(data){
                        deferred.resolve(data);

                    });



                return deferred.promise;
            },
            getUserAdds: function(id){

                var deferred = $q.defer();


                $http({method: 'GET', url: 'http://www.utahmotomarket.com/userAdds' + id})   // for local host   http://localhost:9000/search
                    .success(function(data){                                          // 'http://www.utahmotomarket.com/search'
                        deferred.resolve(data);
                    }).error(function(err) { console.log(err) });


                return deferred.promise;
            }



        }


     });
