  // create the module and name it webApp
  var webApp = angular.module('webApp', ['ngRoute']);

  // configure our routes
  webApp.config(function($routeProvider) {
    $routeProvider

      // route for the home page
      .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
      })

      // route for the about page
      .when('/about', {
        templateUrl : 'pages/about.html',
        controller  : 'aboutController'
      })
      // route for playing around
      .when('/forfun', {
        templateUrl : 'pages/forfun.html',
        controller  : 'funController'
      })
      // route for the contact page
      .when('/contact', {
        templateUrl : 'pages/contact.html',
        controller  : 'contactController'
      })
      .otherwise({redirectTo: '/'});
  });

  // create the controller and inject Angular's $scope
  webApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'My awesome HOME page';
  });

  webApp.controller('aboutController', function($scope) {
    $scope.message = 'I am all ABOUT that!!';
  });

  webApp.controller('contactController', function($scope) {
    $scope.message = 'Here we are in CONTACT page';
  });

  webApp.controller('funController', function($scope) {
    $scope.message = 'Here we are in FUN page';
  });

  angular.module('webApp').controller('funController', ['$scope', function ($scope) {
    window.initialize = function() {
        // code to execute after your JS file referenced in the loadScript function loads
    }
    var loadScript = function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'fun.js?callback=initialize';
        document.body.appendChild(script);
    }
    $scope.$on('$viewContentLoaded', function () {
        loadScript();
  });

}]);