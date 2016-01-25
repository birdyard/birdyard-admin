(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.stats', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.whenAuthenticated('/stats', {
      controller: 'statsController',
      templateUrl: 'sections/views/stats.html',
      resolve: {
        user: ['$Auth', function ($Auth) {
          var $auth = $Auth;
          return $auth.$waitForAuth(); 
        }]
      }
    });
  }])
  
  .controller('statsController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);