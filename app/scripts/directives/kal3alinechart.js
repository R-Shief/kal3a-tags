'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aLineChart
 * @description
 * # kal3aLineChart
 */
angular.module('kal3aTagsApp')
  .component('kal3aLineChart', {
    template: '<linechart data="$ctrl.data" options="$ctrl.options"></linechart>',
    transclude: true,
    bindings: {
      tag: '<'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      this.$onInit = function () {
        var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

        this.options = {
          axes: {
            x: {type: 'date'},
            y: {type: 'linear'}
          },
          series: [
            {
              y: 'value',
              label: this.tag
            }
          ]
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
            this.data = _.map(res.data.rows, function (row) {
              var utc = row.key.splice(1);
              utc[1] = utc[1] - 1;
              return {
                x: new Date(Date.UTC.apply(null, utc)),
                value: row.value
              };
            });
          }.bind(this));
      };
    }]
  });
