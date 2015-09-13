/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50 */
'use strict';

/**
 * @ngdoc function
 * @name bootangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bootangApp
 */
angular.module('bootangApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
