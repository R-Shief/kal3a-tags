'use strict';

/**
 * @ngdoc overview
 * @name kal3aTagsApp
 * @description
 * # kal3aTagsApp
 *
 * Main module of the application.
 */
angular
  .module('kal3aTagsApp', [
    'ngRoute',
    'n3-charts.linechart',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/tag/:tag', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          tag: ['$route', function ($route) {
            return $route.current.params.tag;
          }]
        }
      });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
  }])
;
