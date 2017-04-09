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
    'ngAnimate',
    'nvd3',
    'ui.bootstrap'
  ])
  .run(['$rootScope', '$route', '$location', function ($rootScope, $route, $location) {
    $rootScope.$route = $route;
    $rootScope.$location = $location;
  }])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/specimen/line-chart', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query tag="business"&gt;','<br/>',
          '  &lt;kal3a-line-chart query="$ctrl.query"&gt;&lt;/kal3a-line-chart&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-query tag="\'business\'">',
          '<kal3a-line-chart query="$ctrl.query"></kal3a-line-chart>',
          '</kal3a-query>',
          '</preview>',
          '</kal3a-specimen>'
        ].join('')
      })
      .when('/specimen/image-carousel', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query tag="business"&gt;','<br/>',
          '  &lt;kal3a-image-carousel query="$ctrl.query"&gt;&lt;/kal3a-image-carousel&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-query tag="\'business\'">',
          '<kal3a-image-carousel query="$ctrl.query"></kal3a-image-carousel>',
          '</kal3a-query>',
          '</preview>',
          '</kal3a-specimen>'
        ].join('')
      })
      .when('/specimen/link-list', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query tag="business"&gt;','<br/>',
          '  &lt;kal3a-link-list query="$ctrl.query"&gt;&lt;/kal3a-link-list&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-query tag="\'business\'">',
          '<kal3a-link-list query="$ctrl.query"></kal3a-link-list>',
          '</kal3a-query>',
          '</preview>',
          '</kal3a-specimen>'
        ].join('')
      })
      .when('/specimen/language-table', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query tag="business"&gt;','<br/>',
          '  &lt;kal3a-link-list query="$ctrl.query"&gt;&lt;/kal3a-link-list&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-language-table></kal3a-language-table>',
          '</preview>',
          '</kal3a-specimen>'
        ].join('')
      })
      .when('/specimen/daily-table', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query tag="business"&gt;','<br/>',
          '  &lt;kal3a-link-list query="$ctrl.query"&gt;&lt;/kal3a-link-list&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-daily-table></kal3a-daily-table>',
          '</preview>',
          '</kal3a-specimen>'
        ].join('')
      })
      .when('/specimen/hourly-table', {
        template: [
          '<kal3a-specimen>',
          '<code>',
          '&lt;kal3a-query tag="business"&gt;','<br/>',
          '  &lt;kal3a-link-list query="$ctrl.query"&gt;&lt;/kal3a-link-list&gt;','<br/>',
          '&lt;/kal3a-query&gt;',
          '</code>',
          '<preview>',
          '<kal3a-hourly-table></kal3a-hourly-table>',
          '</preview>',
          '</kal3a-specimen>'
        ].join('')
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
