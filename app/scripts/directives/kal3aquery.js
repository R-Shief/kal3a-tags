/* global angular */
'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aQuery
 * @description
 * # kal3aQuery
 */
angular.module('kal3aTagsApp')
  .component('kal3aQuery', {
    template: [function () {
      return [
        '<form class="row" ng-model-options="{ debounce: 500, updateOn: \'default blur\' }">',
        '<div uib-alert ng-class="\'alert-danger\'" ng-if="$ctrl.error">{{$ctrl.error.reason}}</div>',
        '<kal3a-tag-input query="$ctrl.query" on-update="$ctrl.update(\'query\', \'tag\', value)"></kal3a-tag-input>',
        '<kal3a-date-range-input date-range="$ctrl.query.dateRange" on-update="$ctrl.update(\'query\', \'dateRange\', value)"></kal3a-date-range-input>',
        '</form>',
        '<ng-transclude></ng-transclude>'
      ].join('');
    }],
    bindings: {
      tag: '<',
      dateRange: '<'
    },
    transclude: true,
    controller: [function () {
      var startDate = new Date();
      var endDate = new Date();

      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0,0,0,0);

      endDate.setHours(0,0,0,0);

      this.query = {
        tag: this.tag,
        dateRange: [startDate, endDate]
      };
      this.inputs = [];
      this.graphs = [];
      this.error = false;

      function runQuery(query, queryCtrl) {
        if (angular.isDefined(query.dateRange[0]) &&
          angular.isDefined(query.dateRange[1]) &&
          angular.isDefined(query.tag)) {

          queryCtrl.error = false;

          angular.forEach(queryCtrl.inputs, function (ctrl) {
            ctrl.disable = true;
          });

          angular.forEach(queryCtrl.graphs, function (ctrl) {
            ctrl.runQuery(query).catch(function (res) {
              queryCtrl.error = res.data;
            }).finally(function () {
              angular.forEach(queryCtrl.inputs, function (ctrl) {
                ctrl.disable = false;
              });
            });
          });
        }
      }

      this.update = function (obj, prop, value) {
        var query;
        this[obj][prop] = value;
        query = this[obj];
        runQuery(query, this);
      };

      this.$onInit = function () {
        if (angular.isDefined(this.tag)) {
          this.query.tag = this.tag;
        }
        if (angular.isDefined(this.dateRange)) {
          this.query.dateRange = [new Date(this.dateRange[0]), new Date(this.dateRange[1])];
        }
      };

      this.$postLink = function () {
        runQuery(this.query, this);
      };

    }]
  });
