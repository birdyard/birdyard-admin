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
    
    var $count = $firebaseArray(firebaseService.getRef('presence', 'count'));
    
    function watchCount($data) {
      if ($data.event === 'child_removed' || $data.event === 'child_added') {
        $scope.numActive = $count.length;
      }
    }
    
    $scope.numActive = 'calculating...';
    
    $count.$loaded().then(function () {
      $scope.numActive = $count.length;
      $count.$watch(watchCount);
    });

  }]);
  
})(angular);