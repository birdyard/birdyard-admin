'use strict';

angular.module('birdyard-admin', [
  'birdyard-admin.stats',
  'birdyard-admin.users',
  'birdyard-admin.flagged',
  'birdyard-admin.broadcast'
])

// Routing default

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    redirectTo: '/stats'
  });
}])

// Global controllers

.controller('menuController', ['$scope', '$location', function ($scope, $location) {
  $scope.go = function (location) {
    $location.path(location)
  };
}]);
