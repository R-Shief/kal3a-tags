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
      '<label class="control-label">{{ $ctrl.label }}</label>',
      '<input type="date" ng-model="$ctrl.date" class="form-control" ng-change="$ctrl.update($ctrl.date)" ng-disabled="$ctrl.disable">',
      '</div>'
    ].join(''),
    bindings: {
      date: '<',
      label: '@',
      onUpdate: '&'
    },
    require: {
      queryCtrl: '^kal3aQuery'
    },
    controller: function () {
      this.disable = false;
      this.update = function (value) {
        if (angular.isDate(value)) {
          value.setUTCHours(0,0,0,0);
        }
        this.onUpdate({value: value});
      };
      this.$onInit = function () {
        this.queryCtrl.inputs.push(this);
      };
    }
  });
