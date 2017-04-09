'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aDailyTable
 * @description
 * # kal3aDailyTable
 */
angular.module('kal3aTagsApp')
  .component('kal3aHourlyTable', {
    template: [
      '<div class="panel panel-default">' +
      '<div class="panel-heading" ng-if="$ctrl.settings.title">{{ $ctrl.settings.title }}</div>' +
      '<div class="panel-body" ng-if="$ctrl.settings.body">{{ $ctrl.settings.body }}</div>' +
      '<table class="table table-condensed">' +
      '<tr ng-repeat="row in $ctrl.data">' +
      '<th>' +
      '{{ row.key | date:\'h:mma\' }}' +
      '</th>' +
      '<td class="text-right">{{ row.value | number }}</td>' +
      '</tr>' +
      '</table>' +
      '</div>'
    ].join(''),
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.settings = {
        title: 'Hourly',
        body: 'Count of items per day for last day.'
      };
      this.$onInit = function () {
        this.runQuery();
      };


      this.runQuery = function (query) {
        return $http
          .get(server + '/_design/timeseries/_view/published', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 4,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              limit: 24,
              stale: 'ok',
              descending: true
            }
          })
          .then(function (res) {
            this.data = _.map(res.data.rows, function (row) {
              return {
                key: new Date(row.key[0], row.key[1] - 1, row.key[2], row.key[3]),
                value: row.value
              };
            });
          }.bind(this));

      };
    }]
  });
