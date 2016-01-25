(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.flagged', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/flagged', {
      controller: 'flaggedController',
      templateUrl: 'sections/views/flagged.html'
    });
  }])
  
  .controller('flaggedController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);