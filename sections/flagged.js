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
  
  .controller('flaggedController', [
    '$scope', 
    '$window', 
    'firebaseService', 
    '$firebaseArray', 
  
  function (
    $scope, 
    $window, 
    firebaseService, 
    $firebaseArray) {
    
    function removeComment(id) {
      var $ref = firebaseService.getRef('nodes', id);
            
      $ref.once('value', function ($snap) {
        var removed = $snap.val();
        
        removed.name = 'removed';
        removed.text = 'This comment was removed by a moderator.';
        removed.removed = true;
        
        var $originRef = firebaseService.getRef(removed.origin);
        
        $ref.update(removed);
        $originRef.update(removed, function () {
          removeFlag(id);
        });
      });
    }
    
    function removeFlag(id) {
      var $ref = firebaseService.getRef('flagged', id);
      $ref.remove();
    }
    
    $scope.flaggedItems = $firebaseArray(firebaseService.getRef('flagged'));
    
    $scope.goTo = function (id) {
      $window.open('https://www.birdyard.co/#/n/' + id);
    };
    
    $scope.doAction = function (action, id) {
      if (action === 'removeComment') {
        removeComment(id);
      } else if (action === 'ignore') {
        removeFlag(id);
      }
    };
  }]);
  
})(angular);