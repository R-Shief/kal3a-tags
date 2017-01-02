'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aImageCarousel
 * @description
 * # kal3aImageCarousel
 */
angular.module('kal3aTagsApp')
  .component('kal3aImageCarousel', {
    template: '<uib-carousel>' +
    '<uib-slide ng-repeat="slide in $ctrl.slides">' +
    '<img ng-src="{{ slide }}">' +
    '</uib-slide>' +
    '</uib-carousel>',
    transclude: false,
    bindings: {
      tag: '<'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      this.$onInit = function () {
        var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

        $http
          .get(server + '/_design/enclosure/_view/tags', {
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
              slideFactory = function (row) {
                return row.key[1];
              },
              filterLongTail = function (row) {
                return (row.value > 5);
              };

            this.slides = _.map(_.sortBy(_.filter(res.data.rows, filterLongTail), reverseSort), slideFactory);
          }.bind(this));
      };
    }]
  });
