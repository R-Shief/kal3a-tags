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
    'nvd3',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/specimen/line-chart', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query&gt;','<br/>',
          '&lt;kal3a-line-chart query="$ctrl.query"&gt;&lt;/kal3a-line-chart&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-query>',
          '<kal3a-line-chart query="$ctrl.query"></kal3a-line-chart>',
          '</kal3a-query>',
          '</preview>',
          '</kal3a-specimen>'
        ].join(''),
        controller: [function () {

          this.query = {
            "tag": "business",
            "dateRange": []
          };
        }]
      })
      .when('/specimen/image-carousel', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query&gt;','<br/>',
          '&lt;kal3a-image-carousel query="$ctrl.query"&gt;&lt;/kal3a-image-carousel&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-query>',
          '<kal3a-image-carousel query="$ctrl.query"></kal3a-image-carousel>',
          '</kal3a-query>',
          '</preview>',
          '</kal3a-specimen>'
        ].join(''),
        controller: [function () {

          this.query = {
            "tag": "business",
            "dateRange": []
          };
        }]
      })
      .when('/specimen/link-list', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query&gt;','<br/>',
          '&lt;kal3a-link-list query="$ctrl.query"&gt;&lt;/kal3a-link-list&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-query>',
          '<kal3a-link-list query="$ctrl.query"></kal3a-link-list>',
          '</kal3a-query>',
          '</preview>',
          '</kal3a-specimen>'
        ].join(''),
        controller: [function () {
          this.query = {
            "tag": "business",
            "dateRange": []
          };
        }]
      })
      .when('/parameters/:id', {
        templateUrl: 'views/parameters.html',
        controller: 'ParametersCtrl',
        controllerAs: 'parameters',
        resolve: {
          id: ['$route', function ($route) {
            return $route.current.params.id;
          }]
        }

      });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
  }])
;
