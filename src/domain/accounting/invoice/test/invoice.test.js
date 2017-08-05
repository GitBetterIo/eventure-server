const chai = require('chai');
const Invoice = require('../invoice');
const {assert} = chai;
const omit = require('lodash/omit');

describe("Invoice", () => {
  describe("creating", () => {

    it('creates an invoice', () => {
      const inv = Invoice.create({clientId: 'abc'});
      assert.isOk(inv);
      assert.equal(inv.total, 0)
    });


  });

  describe("managing invoice items", () => {
  })
})
