const chai = require('chai');
const FeeSchedule = require('../feeSchedule');
const {isDate} = require('lodash');
const {assert} = chai;


describe.only('FeeSchedule', () => {
  describe('creating', () => {
    it('creates a fee schedule', () => {
      const sched = FeeSchedule.create({});
      assert.isOk(sched)
    })

    it('crates a fee schedule with an existing list of rules', () => {
      const rule = {pattern: {listingId: 'abc'}, fee: 123};
      const sched = FeeSchedule.create({
        rules: [rule]
      });

      assert.equal(sched.rules.length, 1);
      assert.deepEqual(sched.rules[0], rule);
    });

    it('rejects a fee schedule with a poorly constructed rule', () => {
      const rule = {not:'a', rule:true};
      assert.throws(() => FeeSchedule.create({ rules: [rule] }))
    });

    it('assigns fee schedule defaults', () => {
      const sched = FeeSchedule.create({});

      assert.isOk(isDate(sched.startDate));
      assert.isArray(sched.rules);
      assert.equal(sched.rules.length, 0);
    })

    it('creates a new fee rule', () => {
      const fee = 123;
      const pattern = {listingId: 'abc'};
      const rule = FeeSchedule.createFeeRule({fee, pattern});

      assert.deepEqual(rule.pattern, pattern);
      assert.equal(rule.fee, 123)
    })
  })

  describe('managing rules', () => {
    it('adds a rule to the schedule', () => {
      const sched = FeeSchedule.create({});
      const fee = 123;
      const pattern = {listingId: 'abc'};
      const rule = FeeSchedule.createFeeRule({fee, pattern});

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
