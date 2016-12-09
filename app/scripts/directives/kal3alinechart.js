'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aLineChart
 * @description
 * # kal3aLineChart
 */
angular.module('kal3aTagsApp')
  .component('kal3aLineChart', {
    template: '<nvd3 data="$ctrl.data" options="$ctrl.options"></nvd3>',
    transclude: true,
    bindings: {
      tag: '<'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      this.$onInit = function () {
        var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

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

        $http
          .get(server + '/_design/tag/_view/timeseries', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 5,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              startkey: angular.toJson([this.tag]),
              endkey: angular.toJson([this.tag,{}])
            }
          })
          .then(function (res) {
            this.data = [{
              key: this.tag,
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
