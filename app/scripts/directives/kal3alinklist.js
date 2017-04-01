'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aLinkList
 * @description
 * # kal3aLinkList
 */
angular.module('kal3aTagsApp')
  .component('kal3aLinkList', {
    template: '<ul>' +
    '<li ng-repeat="link in $ctrl.links"><a ng-href="{{ link.key }}">{{ link.key }}</a> ({{ link.value }})</li>' +
    '</ul>',
    require: {
      'queryCtrl': '^kal3aQuery'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.$onInit = function () {
        this.queryCtrl.graphs.push(this);
      };

      this.runQuery = function (query) {
        return $http
          .get(server + '/_design/tags/_view/nofollow', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 2,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              startkey: angular.toJson([query.tag]),
              endkey: angular.toJson([query.tag, {}]),
              stale: 'ok'
            }
          })
          .then(function (res) {
            var reverseSort = function (row) {
                return -row.value;
              },
              listFactory = function (row) {
                return {key: row.key[1], value: row.value};
              },
              filterLongTail = function (row) {
                return (row.value > 5);
              };

            this.links = _.map(_.sortBy(_.filter(res.data.rows, filterLongTail), reverseSort), listFactory);
          }.bind(this));
      };
    }]
  });
