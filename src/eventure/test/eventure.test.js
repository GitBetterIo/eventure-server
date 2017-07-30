const chai = require('chai');
const omit = require('lodash/omit');
const Eventure = require('../eventure');
const {assert} = chai;


describe('Eventure', () => {
  describe('creating', () => {
    it('creates an eventure', () => {
      const evt = Eventure.create({clientId:'abc', name:'def'});
      assert.isOk(evt);
    });

    it('rejects missing fields', () => {
      const data = {
        clientId: 'abc',
        name: 'def'
      }

      assert.doesNotThrow(() => Eventure.create(data));
      assert.throws(() => Eventure.create(omit(data, ['clientId'])));
      assert.throws(() => Eventure.create(omit(data, ['name'])));
    })
  })
})
