(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.users', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.whenAuthenticated('/users', {
      controller: 'usersController',
      templateUrl: 'sections/views/users.html',
      resolve: {
        user: ['$Auth', function ($Auth) {
          var $auth = $Auth;
          return $auth.$waitForAuth(); 
        }]
      }
    });
  }])
  
  .controller('usersController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);