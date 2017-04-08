'use strict';

describe('Controller: ParametersCtrl', function () {

  // load the controller's module
  beforeEach(module('kal3aTagsApp'));

  var ParametersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParametersCtrl = $controller('ParametersCtrl', {
      id: true
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(!!ParametersCtrl.id).toBe(true);
  });
});
