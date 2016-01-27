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
  
  .controller('statsController', ['$scope', 'firebaseService', '$firebaseArray', 
  
  function ($scope, firebaseService, $firebaseArray) {
    
    // Private
    
    function watchCount($data) {
      if ($data.event === 'child_removed' || $data.event === 'child_added') {
        $scope.numActive = $activeCount.length;
      }
    }
    
    // Scope
    
    $scope.numActive = 'calculating...';
    $scope.numUsers = 'calculating...';
    
    var $activeCount = $firebaseArray(firebaseService.getRef('presence', 'count'));
    var $usersRef = firebaseService.getRef('users'); 
    
    $activeCount.$loaded().then(function () {
      $scope.numActive = $activeCount.length;
      $activeCount.$watch(watchCount);
    });
    
    $usersRef.once('value', function ($snap) {
      $scope.numUsers = Object.keys($snap.val()).length;
    });
  }]);
  
})(angular);