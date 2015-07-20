'use strict';

describe('Service: authINterceptor', function () {

  // load the service's module
  beforeEach(module('nodeAngularOausLearningApp'));

  // instantiate service
  var authINterceptor;
  beforeEach(inject(function (_authINterceptor_) {
    authINterceptor = _authINterceptor_;
  }));

  it('should do something', function () {
    expect(!!authINterceptor).toBe(true);
  });

});
