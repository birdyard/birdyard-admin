(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.broadcast', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/broadcast', {
      controller: 'broadcastController',
      templateUrl: 'sections/views/broadcast.html'
    });
  }])
  
  .controller('broadcastController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);