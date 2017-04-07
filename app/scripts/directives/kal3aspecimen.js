'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aSpecimen
 * @description
 * # kal3aSpecimen
 */
angular.module('kal3aTagsApp')
  .component('kal3aSpecimen', {
      template: [function () {
        return [
          '<div class="panel panel-default">',
          '<div class="panel-body">',
          '<pre><code><ng-transclude ng-transclude-slot="code"></ng-transclude></code></pre>',
          '<div class="col-sm-10 col-sm-offset-1">',
          '<ng-transclude ng-transclude-slot="preview"></ng-transclude>',
          '</div>',
          '</div>',
          '</div>'
        ].join('');
      }],
      transclude: {
        code: 'code',
        preview: 'preview'
      }
    }
  );
