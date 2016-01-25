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
  
  .controller('usersController', [
    '$scope', 
    'firebaseService', 
    '$firebaseArray', 
  
  function (
    $scope, 
    firebaseService, 
    $firebaseArray) {
    
    var $usersRef = firebaseService.getRef('users');
    
    // Scope
    
    $scope.users = $firebaseArray($usersRef);
    
    $scope.promote = function (uid) {
      var $user = $scope.users.$getRecord(uid);
      if (!$user.authorization) {
        $user.authorization = {};
      }
      $user.authorization.admin = true;
      $scope.users.$save($user).then(function () {
        console.log('yeah!');
      });
    };
    
    $scope.demote = function (uid) {
      
    };

  }]);
  
})(angular);