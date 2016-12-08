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
      'CornerCouch',
      'n3-charts.linechart',
      'ui.bootstrap'
  ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/:tag', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    tag: ['$route', function ($route) {
                        return $route.current.params.tag;
                    }]
                }
            })
    })
;
