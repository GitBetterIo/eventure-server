const chai = require('chai');
const FeeSchedule = require('../feeSchedule');
const {isDate} = require('lodash');
const {assert} = chai;


describe('FeeSchedule', () => {
  describe('creating', () => {
    it('creates a fee schedule', () => {
      const sched = FeeSchedule.create({});
      assert.isOk(sched)
    })

    it('crates a fee schedule with an existing list of rules', () => {
      const rule = {listingId: 123, startDate: '2017-01-01', endDate: '2017-02-01', amount: 123};
      const sched = FeeSchedule.create({
        listingId: 123,
        rules: [rule]
      });

      assert.equal(sched.rules.length, 1);
      assert.deepEqual(sched.rules[0], rule);
    });

    it('rejects a fee schedule with a poorly constructed rule', () => {
      const rule = {not:'a', rule:true};
      assert.throws(() => FeeSchedule.create({ rules: [rule] }))
    });


    it('creates a new fee rule', () => {
      const listingId = 'abc';
      const amount = 123;

      const rule = FeeSchedule.createFeeRule({listingId, amount, startDate: '2017-01-01', endDate: '2017-02-01'});

      assert.equal(rule.amount, amount)
      assert.equal(rule.listingId, listingId)
    })
  })

  describe('managing rules', () => {
    it('adds a rule to the schedule', () => {
      const amount = 123;
      const listingId = 'abc';
      const startDate = '2017-01-01';
      const endDate = '2017-02-01';
      const sched = FeeSchedule.create({listingId});
      const rule = FeeSchedule.createFeeRule({listingId, amount, startDate, endDate});

      assert.equal(sched.rules.length, 0);
      const newSched = FeeSchedule.addRule(sched, rule)
      assert.equal(newSched.rules.length, 1);
    })
  })


  describe('matching rules', () => {
    it('matches a rule', () => {

    })

    it('does not match a rule', () => {

    })

    it('does not match on an empty rule list', () => {

    })
  })

})
