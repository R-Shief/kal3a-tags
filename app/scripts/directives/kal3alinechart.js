'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aLineChart
 * @description
 * # kal3aLineChart
 */
angular.module('kal3aTagsApp')
  .component('kal3aLineChart', {
    template: [
      '<nvd3 data="$ctrl.data" options="$ctrl.options"></nvd3>'
    ].join(''),
    require: {
      'queryCtrl': '^kal3aQuery'
    },
    transclude: true,
    controller: ['$http', 'fosRouting', '_', 'd3', function ($http, fosRouting, _, d3) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.$onInit = function () {
        this.queryCtrl.graphs.push(this);
        this.options = {
          chart: {
            type: 'lineChart',
            height: 500,
            xAxis: {
              tickFormat: function(d){
                return d3.time.format('%x')(new Date(d));
              }
            }
          }
        };

      };

      this.runQuery = function (query) {
        var startkey = [
          query.tag,
          query.dateRange[0].getFullYear(),
          query.dateRange[0].getMonth() + 1,
          query.dateRange[0].getDate()
        ];
        var endkey = [
          query.tag,
          query.dateRange[1].getFullYear(),
          query.dateRange[1].getMonth() + 1,
          query.dateRange[1].getDate(),
          {}
        ];
        $http
          .get(server + '/_design/tag/_view/timeseries', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 5,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              startkey: angular.toJson(startkey),
              endkey: angular.toJson(endkey),
              stale: 'ok'
            }
          })
          .then(function (res) {
            this.data = [{
              key: query.tag,
              values: _.map(res.data.rows, function (row) {
                var utc = row.key.splice(1);
                utc[1] = utc[1] - 1;
                return {
                  x: new Date(Date.UTC.apply(null, utc)),
                  y: row.value,
                  series: 0
                };
              })
            }];
          }.bind(this));
      };
    }]
  });
