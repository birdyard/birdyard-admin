(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.users', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/users', {
      controller: 'usersController',
      templateUrl: 'sections/views/users.html'
    });
  }])
  
  .controller('usersController', ['$scope', function ($scope) {
    
  }]);
  
})(angular);