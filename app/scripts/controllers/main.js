'use strict';

/**
 * @ngdoc function
 * @name kal3aTagsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kal3aTagsApp
 */
angular.module('kal3aTagsApp')
  .controller('MainCtrl', ['tag', function (tag) {
    this.tag = tag;
  }]);
