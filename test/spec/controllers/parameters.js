'use strict';

describe('Controller: ParametersctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('kal3aTagsApp'));

  var ParametersctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParametersctrlCtrl = $controller('ParametersctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParametersctrlCtrl.awesomeThings.length).toBe(3);
  });
});
