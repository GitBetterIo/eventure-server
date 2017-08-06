const chai = require('chai');
const authService = require('../auth.service')();

const {assert} = chai;

describe("Authentication Service", () => {
  it("generates a random token", () => {
    const token = authService.generateToken();
    assert.isString(token);
  })
})
