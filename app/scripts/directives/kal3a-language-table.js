'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aLanguageTable
 * @description
 * # kal3aLanguageTable
 */
angular.module('kal3aTagsApp')
  .component('kal3aLanguageTable', {
    template: [
      '<div class="panel panel-default">' +
      '<div class="panel-heading" ng-if="$ctrl.settings.title">{{ $ctrl.settings.title }}</div>' +
      '<div class="panel-body" ng-if="$ctrl.settings.body">{{ $ctrl.settings.body }}</div>' +
      '<table class="table table-condensed">' +
      '<tr ng-repeat="row in $ctrl.data">' +
      '<th>' +
      '<span ng-repeat="lang in langs = ($ctrl.languages | filter:{alpha2: row.key})">' +
      '{{ lang.English }}' +
      '</span>' +
      '<span ng-if="($ctrl.languages | filter:{alpha2: row.key}).length == 0">' +
      '{{ row.key }}' +
      '</span>' +
      '</th>' +
      '<td class="text-right">{{ row.value | number }}</td>' +
      '</tr>' +
      '</table>' +
      '</div>'
    ].join(''),
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.settings = {
        title: 'Languages',
        body: 'Collected from ...'
      };

      this.languages = [];
      this.$onInit = function () {
        this.getLangs();
        this.runQuery();
      };

      this.getLangs = function () {
        return $http.get('http://data.okfn.org/data/core/language-codes/r/language-codes-full.json')
          .then(function (res) {
            this.languages = res.data;
          }.bind(this));
      };


      this.runQuery = function (query) {
        return $http
          .get(server + '/_design/tags/_view/lang', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 1,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              stale: 'ok'
            }
          })
          .then(function (res) {
            this.data = res.data.rows;
          }.bind(this));

      };
    }]
  });
