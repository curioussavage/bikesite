'use strict';

angular.module('newMotoApp')
  .service('Search', function Search($http, $q, $rootScope, Auth) {

    return {
        getAdds: function () {

            var deferred = $q.defer();

            $http({method: 'GET', url: 'http://www.newmoto.us/search'})   // for local host   http://localhost:9000/search
                .success(function (data) {                                          // 'http://www.utahmotomarket.com/search'
                    deferred.resolve(data);
                }).error(function (err) {
                    console.log(err)
                });


            return deferred.promise;


        },
        searchAdds: function (params) {

            var deferred = $q.defer();

            $http.post('http://www.newmoto.us/search', params)  // for local host     http://localhost:9000
                .success(function (data) {
                    deferred.resolve(data);


                });

            return deferred.promise;
        },

        postFav: function (fav) {
            var favorite = {addId: fav, id: undefined}
            if ($rootScope.currentUser){
                var deferred = $q.defer();

                favorite.id = $rootScope.currentUser.id;


                $http.post('http://www.newmoto.us/favs', favorite)  // for local host     http://localhost:9000
                    .success(function (data) {
                        deferred.resolve(data);


                    });
                console.log(deferred.promise)
                return deferred.promise;

            } else {
                Window.localStorage
            }



        },
        removeFav: function (fav) {
            var favorite = {addId: fav, id: undefined}



                favorite.id = $rootScope.currentUser.id;

                var deferred = $q.defer();

                $http.put('http://www.newmoto.us/favs', favorite)  // for local host     http://localhost:9000
                    .success(function (data) {
                        deferred.resolve(data);


                    });

                return deferred.promise;


        },
        getFavs: function(id) {
            if (Auth.isLoggedIn()) {


                var deferred = $q.defer();

            $http.get('http://www.newmoto.us/favs' + id)// for local host     http://localhost:9000   // user._id
                .success(function (data) {
                    deferred.resolve(data);


                });

            return deferred.promise;

            } else return [];
    }


    }


  });
