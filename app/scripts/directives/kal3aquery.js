'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aQuery
 * @description
 * # kal3aQuery
 */
angular.module('kal3aTagsApp')
  .component('kal3aQuery', {
    template: [
      '<kal3a-tag-input ng-model="$ctrl.query.tag" ng-model-options="{ debounce: 200 }" on-update="$ctrl.update(\'query\', \'tag\', value)"></kal3a-tag-input>',
      '<kal3a-date-range-input date-range="$ctrl.query.dateRange" on-update="$ctrl.update(\'query\', \'dateRange\', value)"></kal3a-date-range-input>',
      '<ng-transclude></ng-transclude>'
    ].join(''),
    transclude: true,
    controller: [function () {
      var startDate = new Date();
      var endDate = new Date();

      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0,0,0,0);

      endDate.setHours(0,0,0,0);

      this.query = {
        dateRange: [startDate, endDate],
        tag: ''
      };
      this.graphs = [];

      this.update = function (obj, prop, value) {
        var query;
        this[obj][prop] = value;
        query = this[obj];
        angular.forEach(this.graphs, function (ctrl) {
          if (angular.isDefined(query.dateRange[0]) && angular.isDefined(query.dateRange[1]) && angular.isDefined(query.tag)) {
            ctrl.runQuery(query);
          }
        });
      };
    }]
  });
