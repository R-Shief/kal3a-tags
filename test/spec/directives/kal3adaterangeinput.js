'use strict';

describe('Directive: kal3aDateRangeInput', function () {

  // load the directive's module
  beforeEach(module('kal3aTagsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kal3a-date-range-input></kal3a-date-range-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kal3aDateRangeInput directive');
  }));
});
