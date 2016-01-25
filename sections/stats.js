(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.stats', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/stats', {
      controller: 'statsController',
      templateUrl: 'sections/views/stats.html'
    });
  }])
  
  .controller('statsController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);