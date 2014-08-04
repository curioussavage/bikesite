'use strict';

angular.module('newMotoApp')
  .service('Sell', function Sell($http, $q, Auth) {



        return {
            postAdd: function(listing){
                console.log(listing);



                var deferred = $q.defer();

                $http.post('http://http://localhost:9000/listing', listing)  //   http://www.utahmotomarket.com for local host
                    .success(function(data){
                        deferred.resolve(data);

                    });



                return deferred.promise;
            },
            getUserAdds: function(){

                var deferred = $q.defer();

                Auth.currentUser().$promise.then(function(user){
                    var id = user._id;
                });

                $http({method: 'GET', url: 'http://localhost:9000/userAdds'})   // for local host   http://localhost:9000/search
                    .success(function(data){                                          // 'http://www.utahmotomarket.com/search'
                        deferred.resolve(data);
                    }).error(function(err) { console.log(err) });


                return deferred.promise;


            }



        }


     });
