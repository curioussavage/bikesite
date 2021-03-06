'use strict';

angular.module('newMotoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Dashboard',
      'link': '/settings',
      'hide': '!currentUser'
    },{
        'title': 'Search',
        'link': '/search'

    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

//    $scope.isActive = function(route) {
//      return route === $location.path();
//    };
  });
