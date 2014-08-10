'use strict';

angular.module('newMotoApp')
  .service('Search', function Search($http, $q, $rootScope, Auth) {

    return {
        getAdds: function () {

            var deferred = $q.defer();

            $http({method: 'GET', url: 'http://localhost:9000/search'})   // for local host   http://localhost:9000/search
                .success(function (data) {                                          // 'http://www.utahmotomarket.com/search'
                    deferred.resolve(data);
                }).error(function (err) {
                    console.log(err)
                });


            return deferred.promise;


        },
        searchAdds: function (params) {

            var deferred = $q.defer();

            $http.post('http://localhost:9000/search', params)  // for local host     http://localhost:9000
                .success(function (data) {
                    deferred.resolve(data);


                });

            return deferred.promise;
        },

        postFav: function (fav) {
            var favorite = {addId: fav, id: undefined}
            var deferred = $q.defer();

                favorite.id = $rootScope.currentUser.id


                $http.post('http://www.utahmotomarket.com/favs', favorite)  // for local host     http://localhost:9000
                    .success(function (data) {
                        deferred.resolve(data);


                    });
                        console.log(deferred.promise)
                return deferred.promise;



        },
        removeFav: function (fav) {
            var favorite = {addId: fav, id: undefined}



                favorite.id = $rootScope.currentUser.id;

                var deferred = $q.defer();

                $http.put('http://www.utahmotomarket.com/favs', favorite)  // for local host     http://localhost:9000
                    .success(function (data) {
                        deferred.resolve(data);


                    });

                return deferred.promise;


        },
        getFavs: function(id) {
            if (Auth.isLoggedIn()) {


                var deferred = $q.defer();

            $http.get('http://www.utahmotomarket.com/favs' + id)// for local host     http://localhost:9000   // user._id
                .success(function (data) {
                    deferred.resolve(data);


                });

            return deferred.promise;

            } else return [];
    }


    }


  });
