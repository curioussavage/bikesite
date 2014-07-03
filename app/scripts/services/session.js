'use strict';

angular.module('newMotoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
