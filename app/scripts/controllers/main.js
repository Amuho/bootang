'use strict';

/**
 * @ngdoc function
 * @name bootangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bootangApp
 */
angular.module('bootangApp')
        .controller('MainCtrl', function ($scope) {
            console.log('loaded.....');
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.test = function () {
                alert('click');
            };
            $scope.groups = [
                {
                    title: 'Dynamic Group Header - 1',
                    content: 'Dynamic Group Body - 1'
                },
                {
                    title: 'Dynamic Group Header - 2',
                    content: 'Dynamic Group Body - 2'
                },
                {
                    title: 'Dynamic Group Header - 3',
                    content: 'Dynamic Group Body - 3'
                },
                {
                    title: 'Dynamic Group Header - 4',
                    content: 'Dynamic Group Body - 4'
                }
            ];
            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };


        });
