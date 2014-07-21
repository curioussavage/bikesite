'use strict';

angular.module('newMotoApp')
  .service('Search', function Search($http, $q) {

    return {
            getAdds: function(){

                var deferred = $q.defer();

                $http({method: 'GET', url: 'http://localhost:9000/search'})   // for local host   http://localhost:9000
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err) { console.log(err) });




    //            $http({method: 'GET', url: 'http://www.utahmotomarket.com/search/'})
    //                .success(function(data){
    //                    deferred.resolve(data);
    //                });

                return deferred.promise;


            },
            searchAdds: function(params){

    //            var deferred = $q.defer();
    //
    //            $http({method: 'GET', url: 'http://localhost:9001/search/'})   // for local host
    //                .success(function(data){
    //                    deferred.resolve(data);
    //                }).error(function(err) { console.log(err) });
    //
    //
    //
    //            return deferred.promise;

                var deferred = $q.defer();

                $http.post('/api/search', params)  // for local host     http://localhost:9000
                    .success(function(data){
                        deferred.resolve(data);


                    });



                return deferred.promise;
            }


        }


  });