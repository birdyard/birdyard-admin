(function (angular) {
  
  'use strict';
  
  var securedRoutes = [];
  
  angular.module('birdyard-admin.auth', [
    'ngRoute',
    'firebase'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.when('/auth', {
      controller: 'authController',
      templateUrl: 'sections/views/auth.html'
    });
    
  }])
  
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.whenAuthenticated = function (path, route) {
      securedRoutes.push(path); // store all secured routes for use with authRequired() below
      route.resolve = route.resolve || {};
        
      route.resolve.user = function ($Auth) {
        return $Auth.$requireAuth();  
      };
        
      $routeProvider.when(path, route);

      return this;
    };
  }])
  
  .run(['$rootScope', '$location', '$Auth', function ($rootScope, $location, $Auth) {

    // some of our routes may reject resolve promises with the special {authRequired: true} error
    // this redirects to the signin page whenever that is encountered
    $rootScope.$on("$routeChangeError", function (e, next, prev, err) {
      if (err === "AUTH_REQUIRED") {
        $location.path('/auth');
      }
    });

    function check(user) {
      // Global auth boolean
      $rootScope.signedIn = !!user;
      // Check if user is authorized for this route
      if (!user && authRequired($location.path())) {
        $location.path('/');
      } 
    }

    function authRequired(path) {
      return securedRoutes.indexOf(path) !== -1;
    }
        
    // watch for signin status changes and redirect if appropriate
    $Auth.$onAuth(check);
  }])
  
  .controller('authController', ['$scope', 'firebaseService', function ($scope, firebaseService) {
    
    $scope.signIn = function () {
      
      var $ref = firebaseService.getRef();

      $ref.authWithOAuthPopup('twitter', function(error, authData) { 
        if (error) {
          console.error(error);
        }
      });
    };
    
    $scope.signOut = function () {
      var $ref = firebaseService.getRef();
      $ref.unauth(); 
    };
    
  }]);
  
})(angular);