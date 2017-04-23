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
    'ngAnimate',
    'nvd3',
    'ui.bootstrap'
  ])
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$location = $location;
  }])
;
