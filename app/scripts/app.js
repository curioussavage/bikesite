'use strict';

angular.module('newMotoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'photomodule',
  'mgcrea.ngStrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

        //Reset headers to avoid OPTIONS request (aka preflight)
//        $httpProvider.defaults.headers.common = {};
//        $httpProvider.defaults.headers.post = {};
//        $httpProvider.defaults.headers.put = {};
//        $httpProvider.defaults.headers.patch = {};
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
        .when('/search', {
            templateUrl: 'partials/Search',
            controller: 'SearchCtrl',
            resolve: {
                adds: function (Search) {

                   return Search.getAdds();

                }


            }
        })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });