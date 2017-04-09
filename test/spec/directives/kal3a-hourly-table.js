'use strict';

describe('Directive: kal3aHourlyTable', function () {

  // load the directive's module
  beforeEach(module('kal3aTagsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kal3a-hourly-table></kal3a-hourly-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kal3aHourlyTable directive');
  }));
});
