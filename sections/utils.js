(function (angular) {
  
  'use strict';
  
  angular.module('birdyard-admin.utils', [
    'firebase'
  ])
  
  // Firebase reference factory
  
  .factory('firebaseService', ['$window', function ($window) {
    
    var FIREBASE = 'https://birdyard.firebaseio.com';
    
    // Private
    
    function pathRef(args) {
      for (var i = 0, max = args.length; i < max; i++) {
        if (angular.isArray(args[i])) {
          args[i] = pathRef(args[i]);
        } else if (typeof args[i] !== 'string') {
          throw new Error('Argument '+ i +' is not a string: '+args[i]);
        }
      }
      return args.join('/');
    }
    
    // Public
    
    var _service = {};
    
    function _getRef() {
      
      var $ref = new $window.Firebase(FIREBASE);        // Create a new reference to the Firebase root
      var args = Array.prototype.slice.call(arguments); // Path to data
      
      if (args.length) {
        $ref = $ref.child(pathRef(args));
      }
      
      return $ref;
    }
    
    _service.getRef = _getRef;
    
    return _service;
    
  }])
  
  // Firebase auth factory
  
  .factory('$Auth', ['$firebaseAuth', 'firebaseService', function($firebaseAuth, firebaseService) {
    return $firebaseAuth(firebaseService.getRef());
  }]);
  
})(angular);