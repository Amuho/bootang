'use strict';

/**
 * @ngdoc overview
 * @name bootangApp
 * @description
 * # bootangApp
 *
 * Main module of the application.
 */
angular
  .module('bootangApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ngSanitize',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }  );
  
