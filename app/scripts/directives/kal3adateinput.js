/* globals angular */
'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aDateInput
 * @description
 * # kal3aDateInput
 */
angular.module('kal3aTagsApp')
  .component('kal3aDateInput', {
    template: [
      '<div class="form-group">',
      '<label>{{ $ctrl.label }}</label>',
      '<input type="date" ng-model="$ctrl.date" class="form-control" ng-change="$ctrl.update($ctrl.date)">',
      '</div>'
    ].join(''),
    bindings: {
      date: '<',
      label: '@',
      onUpdate: '&'
    },
    controller: function () {
      this.update = function (value) {
        if (angular.isDate(value)) {
          value.setUTCHours(0,0,0,0);
        }
        this.onUpdate({value: value});
      };
    }
  });
