/* global angular */
'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aTagInput
 * @description
 * # kal3aTagInput
 */
angular.module('kal3aTagsApp')
  .component('kal3aTagInput', {
    template: [
      '<div class="form-group col-md-12">',
      '<label class="control-label">Tag</label>',
      '<input type="text" ng-model="$ctrl.query.tag" typeahead-on-select="$ctrl.update($item.key)" placeholder="Start typing and our list of keywords will drop down" typeahead-template-url="customTemplate.html" uib-typeahead="address as address.key for address in $ctrl.getTags($viewValue)" class="form-control input-lg" typeahead-select-on-blur="true" typeahead-select-on-exact="true" ng-change="$ctrl.update($ctrl.query.tag)" ng-disabled="$ctrl.disable">',
      '</div>',
      '<script type="text/ng-template" id="customTemplate.html">',
      '<a>',
      '<span ng-bind-html="match.model.key | uibTypeaheadHighlight:query">',
      '</span> ({{ match.model.value }})',
      '</a>',
      '</script>'
    ].join(''),
    bindings: {
      query: '<',
      onUpdate: '&'
    },
    require: {
      queryCtrl: '^kal3aQuery'
    },
    controller: ['$http', 'fosRouting', '_', function ($http, fosRouting, _) {
      var server = fosRouting.generate('_guzzle_proxy_couchdb', {}, true);

      this.disable = false;
      this.update = function (value) {
        this.onUpdate({ value: value });
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
              endkey: angular.toJson([endkey, {}]),
              stale: 'ok'
            }
          })
          .then(function (res) {
            return _.map(res.data.rows, function (row) {
              return {key: row.key[0], value: row.value};
            });
          }.bind(this));
      };
      this.$onInit = function () {
        this.queryCtrl.inputs.push(this);
      };

    }]
  });
