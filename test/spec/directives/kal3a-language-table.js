'use strict';

describe('Directive: kal3aLanguageTable', function () {

  // load the directive's module
  beforeEach(module('kal3aTagsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kal3a-language-table></kal3a-language-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kal3aLanguageTable directive');
  }));
});
