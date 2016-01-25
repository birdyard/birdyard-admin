(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.broadcast', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.whenAuthenticated('/broadcast', {
      controller: 'broadcastController',
      templateUrl: 'sections/views/broadcast.html',
      resolve: {
        user: ['$Auth', function ($Auth) {
          var $auth = $Auth;
          return $auth.$waitForAuth(); 
        }]
      }
    });
  }])
  
  .controller('broadcastController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);