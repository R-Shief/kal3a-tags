'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aTagInput
 * @description
 * # kal3aTagInput
 */
angular.module('kal3aTagsApp')
  .component('kal3aTagInput', {
    template: '<input type="text" ng-model="$ctrl.tag" typeahead-on-select="$ctrl.goTo($item)" placeholder="Start typing and our list of keywords will drop down" typeahead-template-url="customTemplate.html" uib-typeahead="address as address.key for address in $ctrl.getTags($viewValue)" class="form-control input-lg"><script type="text/ng-template" id="customTemplate.html"><a><span ng-bind-html="match.model.key | uibTypeaheadHighlight:query"></span> ({{ match.model.value }})</a></script>',
    controller: ['$http', 'fosRouting', '$location', '_', function ($http, fosRouting, $location, _) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.goTo = function ($item) {
        $location.path('/tag/' + $item.key);
      };

      this.getTags = function (val) {

        var endPosition = val.length - 1,
          endCharacterCode = val.charCodeAt(endPosition),
          nextCharacter = String.fromCharCode(endCharacterCode + 1),
          endkey = val.substr(0, endPosition) + nextCharacter;

        return $http
          .get(server + '/_design/tag/_view/timeseries', {
            params: {
              group: true,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              group_level: 1,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              startkey: angular.toJson([val]),
              endkey: angular.toJson([endkey, {}])
            }
          })
          .then(function (res) {
            return _.map(res.data.rows, function (row) {
              return {key: row.key[0], value: row.value};
            });
          }.bind(this));
      };

    }]
  });
