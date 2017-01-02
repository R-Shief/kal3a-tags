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
    transclude: true,
    bindings: {
      tag: '<'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      this.$onInit = function () {
        var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

        $http
          .get(server + '/_design/nofollow/_view/tags', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 2,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              startkey: angular.toJson([this.tag]),
              endkey: angular.toJson([this.tag,{}]),
              stale: 'ok'
            }
          })
          .then(function (res) {
            var reverseSort = function (row) {
                return -row.value;
              },
              listFactory = function (row) {
                return { key: row.key[1], value: row.value };
              },
              filterLongTail = function (row) {
                return (row.value > 5);
              };

            this.links = _.map(_.sortBy(_.filter(res.data.rows, filterLongTail), reverseSort), listFactory);
          }.bind(this));
      };
    }]
  });
