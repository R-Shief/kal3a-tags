/* globals angular */
'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3acollectionchart
 * @description
 * # kal3acollectionchart
 */
angular.module('kal3aTagsApp')
  .component('kal3aCollectionChart', {
    template: [
      '<div>',
      '<div class="form-group">',
      '<label>Choose tags to graph</label>',
      '<form class="form-inline">',
      '<select class="form-control" ng-options="(value + \' \' + ($ctrl.totals[value][0].all | number)) for value in $ctrl.tags" ng-model="$ctrl.selectedTags" multiple ng-change="$ctrl.refresh()"></select>',
      '</form>',
      '</div>',
      '<nvd3 data="$ctrl.data" options="$ctrl.options" api="$ctrl.api"></nvd3>',
      '</div>'
    ].join(''),
    bindings: {
      parameters: '@'
    },
    transclude: false,
    controller: ['$http', 'fosRouting', '_', 'd3', function ($http, fosRouting, _, d3) {
      this.$onInit = function () {
        console.log(this.parameters);
        var server = fosRouting.generate('get_stream_summary', {parameters: this.parameters}, true);

        this.store = [];
        this.totals = {};
        this.selectedTags = [];
        this.options = {
          chart: {
            type: 'lineChart', height: 600, xAxis: {
              tickFormat: function (d) {
                return d3.time.format('%x')(new Date(d));
              }
            }, x: function (d) {
              return new Date(d[0]);
            }, y: function (d) {
              return d[1];
            }
          }
        };

        $http
          .get(server)
          .then(function (res) {
            this.tags = this.selectedTags = _(res.data).chain().keys(res.data).filter(function (value) {
              return value !== '_total';
            }).value();

            this.totals = res.data._total;
            delete res.data._total;

            this.store = res.data;
            this.data = this.graphTags(this.selectedTags);
          }.bind(this));
      };

      this.refresh = function () {
        this.api.updateWithData(this.graphTags(this.selectedTags));
      };

      this.graphTags = function (tags) {
        return _
          .chain(this.store)
          .pick(tags)
          .map(function (value, key) {
            return {
              values: _.map(value, function (row) {
                return _(row).chain().pairs().flatten().value();
              }),
              key: key
            };
          }).value();
      };
    }]
  });
