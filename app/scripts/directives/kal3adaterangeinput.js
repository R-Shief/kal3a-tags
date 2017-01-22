'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aDateRangeInput
 * @description
 * # kal3aDateRangeInput
 */
angular.module('kal3aTagsApp')
  .component('kal3aDateRangeInput', {
    template: [
      '<div class="form-inline">',
      '<kal3a-date-input date="$ctrl.dateRange[0]" label="Start date" on-update="$ctrl.update(0, value)"></kal3a-date-input>',
      '<kal3a-date-input date="$ctrl.dateRange[1]" label="End date" on-update="$ctrl.update(1, value)"></kal3a-date-input>',
      '</div>'
    ].join(''),
    bindings: {
      dateRange: '<',
      onUpdate: '&'
    },
    controller: [function () {
      this.update = function(prop, value) {
        this.dateRange[prop] = value;
        this.onUpdate({ value: this.dateRange });
      };
    }]
  });
