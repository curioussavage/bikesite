'use strict';

var siteUrl = 'http://www.newmoto.us';
//var siteUrl = 'http://localhost:9000';

angular.module('newMotoApp')
  .service('Sell', function Sell($http, $q) {



        return {
            postAdd: function(listing){
                console.log(listing);


                var deferred = $q.defer();

                $http.post( siteUrl + '/listing', listing)  //   http://www.newmoto.us for local host
                    .success(function(data){
                        deferred.resolve(data);

                      });



                return deferred.promise;
              },
            confirmZip: function(zip){

                var deferred = $q.defer();


                $http({method: 'GET', url: 'http://zipfeeder.us/zip?key=sfNpKD_X&zips=' + zip })
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err) { console.log(err); });


                return deferred.promise;
            },

            getUserAdds: function(id){

                var deferred = $q.defer();


                $http({method: 'GET', url: siteUrl + '/userAdds' + id})
                    .success(function(data){
                        deferred.resolve(data);
                      }).error(function(err) { console.log(err); });


                return deferred.promise;
              },
            archiveAdd: function (id) {
                var deferred = $q.defer();


                $http.put( siteUrl + '/listing', {'id': id})  //   http://www.utahmotomarket.com for local host
                    .success(function(data){
                        deferred.resolve(data);

                    });



                return deferred.promise;

            }



        }


     });
