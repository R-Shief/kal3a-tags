'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aImageCarousel
 * @description
 * # kal3aImageCarousel
 */
angular.module('kal3aTagsApp')
  .component('kal3aImageCarousel', {
    template: [
      '<div uib-carousel>',
      '<div uib-slide ng-repeat="slide in $ctrl.slides" index="slide.id">',
      '<img ng-src="{{ slide.src }}" ng-style="slide.style">',
      '</div>',
      '</div>'
    ].join(''),
    bindings: {
      query: '<'
    },
    require: {
      'queryCtrl': '^kal3aQuery'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.$onInit = function () {
        this.queryCtrl.graphs.push(this);
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

        return $http
          .get(server + '/_design/enclosure/_view/tags_timeseries', {
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
            var reverseSort = function (row) {
                return -row.value;
              },
              slideFactory = function (row, k) {
                return { id: k, src: row.key[4], style: { height: '500px' } };
              },
              filterLongTail = function (row) {
                return (row.value > 5);
              };

            this.slides = _(res.data.rows).chain().sortBy(reverseSort).filter(filterLongTail).map(slideFactory).uniq().value();
          }.bind(this));
      };
    }]
  });
