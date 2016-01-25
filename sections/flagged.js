(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.flagged', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.whenAuthenticated('/flagged', {
      controller: 'flaggedController',
      templateUrl: 'sections/views/flagged.html',
      resolve: {
        user: ['$Auth', function ($Auth) {
          var $auth = $Auth;
          return $auth.$waitForAuth(); 
        }]
      }
    });
  }])
  
  .controller('flaggedController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);