'use strict';

describe('Service: authtocken', function () {

  // load the service's module
  beforeEach(module('nodeAngularOausLearningApp'));

  // instantiate service
  var authtocken;
  beforeEach(inject(function (_authtocken_) {
    authtocken = _authtocken_;
  }));

  it('should do something', function () {
    expect(!!authtocken).toBe(true);
  });

});
