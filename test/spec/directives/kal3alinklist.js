'use strict';

describe('Directive: kal3aLinkList', function () {

  // load the directive's module
  beforeEach(module('kal3aTagsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kal3a-link-list></kal3a-link-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kal3aLinkList directive');
  }));
});
