const {assert} = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../../config')

const toISODate = d => d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()

describe.only("feeSchedule", () => {
  before(() => {
    const container = require('../../../../container')({config})
    FeeSchedule = container.cradle.feeScheduleObject
  })

  it("creates an empty fee schedule", () => {
    const fs = FeeSchedule()
    assert.isOk(fs)
    assert.isArray(fs.fees)
  })

  describe("adding dates", () => {
    it("adds a fee", () => {
      const fs = FeeSchedule()
      const feeDate = new Date()
      const expectedDate = toISODate(feeDate)
  
      assert.equal(fs.fees.length, 0)
      fs.addFee({feeDate, fee: 123})
      assert.equal(fs.fees.length, 1)
      assert.deepEqual(fs.fees[0], {feeDate: expectedDate, fee: 123, close: false})
    })

    it("rejects invalid date strings", () => {
      const fs = FeeSchedule();
      const feeDate = 'abc'

      const willThrow = () => fs.addFee({feeDate, fee:1})
      assert.throws(willThrow)
    })
    
    it("rejects non-datelike objects", () => {
      const fs = FeeSchedule();
      const feeDate = {}
  
      const willThrow = () => fs.addFee({feeDate, fee:1})
      assert.throws(willThrow)
    })

    it("Rejects negative fees", () => {
      const fs = FeeSchedule()
      const feeDate = new Date()
      const fee = -123

      const willThrow = () => fs.addFee({feeDate, fee})
      assert.throws(willThrow)
    })
    
    it("rejects non-numeric fees when close=false", () => {
      const fs = FeeSchedule()
      const feeDate = new Date()
      const fee = 'abc'
  
      const willThrow = () => fs.addFee({feeDate, fee})
      assert.throws(willThrow)
    })
    
    it("allows null fees when close = true", () => {
      const fs = FeeSchedule()
      const feeDate = new Date()
      const fee = null
      const close = true
  
      const willNotThrow = () => fs.addFee({feeDate, fee, close})
      assert.doesNotThrow(willNotThrow)
    })

    it("sets the closing date", () => {
      const fs = FeeSchedule()
      const feeDate = new Date()

      assert.isNotOk(fs.closeDate)
      fs.addFee({feeDate, fee: 1, close: true})
      assert.isOk(fs.closeDate)
      assert.equal(fs.closeDate, toISODate(feeDate))
    })
    
    it("resets the closing date if fee added after close", () => {
      const fs = FeeSchedule()
      const closeDate = '2016-01-01'
      const feeDate = new Date()
  
      fs.addFee({feeDate: closeDate, fee: 1, close: true})
      assert.equal(fs.closeDate, closeDate)
      fs.addFee({feeDate, fee: 1, close: true})
      assert.equal(fs.closeDate, toISODate(feeDate))
      assert.equal(fs.fees[0].close, false)
      assert.equal(fs.fees[1].close, true)
      
    })

    it("overwrites existing fees", () => {
      const fs = FeeSchedule()
      const feeDate = toISODate(new Date())

      fs.addFee({feeDate, fee: 1})
      assert.equal(fs.fees.length, 1)
      assert.equal(fs.fees[0].fee, 1)
      fs.addFee({feeDate, fee: 2})
      assert.equal(fs.fees.length, 1)
      assert.equal(fs.fees[0].fee, 2)
    })

    it("sorts the new list from earliest to most recent",  () => {
      const fs = FeeSchedule()
      fs.addFee({feeDate: '2017-05-01', fee: 5})
      fs.addFee({feeDate: '2017-03-01', fee: 3})
      fs.addFee({feeDate: '2017-01-01', fee: 1})
      fs.addFee({feeDate: '2017-02-01', fee: 2})
      fs.addFee({feeDate: '2017-04-01', fee: 4})
      assert.equal(fs.fees[0].feeDate, '2017-01-01')
      assert.equal(fs.fees[1].feeDate, '2017-02-01')
      assert.equal(fs.fees[2].feeDate, '2017-03-01')
      assert.equal(fs.fees[3].feeDate, '2017-04-01')
      assert.equal(fs.fees[4].feeDate, '2017-05-01')

    })
  })

  describe("calculating fee", () => {
    it("returns a fee calculation object", () => {
      const fs = FeeSchedule()
      const feeDate = '2017-01-01'
      fs.addFee({feeDate, fee: 123})
      const feeObj = fs.calculateFee(feeDate)
      assert.property(feeObj, 'feeDate')
      assert.property(feeObj, 'fee')
      assert.property(feeObj, 'derived')
      assert.property(feeObj, 'restricted')
      assert.equal(feeObj.feeDate, feeDate)
      assert.equal(feeObj.fee, 123)
      assert.equal(feeObj.derived, false)
      assert.isNotOk(feeObj.restricted)
    })
    
    it("returns an interpolated fee", () => {
      const fs = FeeSchedule()
      const feeDate = '2017-01-01'
      const checkDate = '2017-02-01'
      fs.addFee({feeDate, fee: 123})
      const feeObj = fs.calculateFee(checkDate)
      assert.equal(feeObj.fee, 123)
      assert.equal(feeObj.feeDate, checkDate)
      assert.equal(feeObj.derived, true)
      assert.isNotOk(feeObj.restricted)
    })
    
    it("returns an interpolated fee when there are multiple set fee dates", () => {
      const fs = FeeSchedule()
      const feeDate1 = '2017-01-01'
      const feeDate2 = '2017-03-01'
      const checkDate = '2017-02-01'
      fs.addFee({feeDate: feeDate1, fee: 111})
      fs.addFee({feeDate: feeDate2, fee: 222})
      const feeObj = fs.calculateFee(checkDate)
      assert.equal(feeObj.fee, 111)
      assert.equal(feeObj.feeDate, checkDate)
      assert.equal(feeObj.derived, true)
      assert.isNotOk(feeObj.restricted)
    })

    it("returns an interpolated fee when there are multiple set fee dates", () => {
      const fs = FeeSchedule()
      const feeDate1 = '2017-01-01'
      const feeDate2 = '2017-03-01'
      const checkDate = '2017-04-01'
      fs.addFee({feeDate: feeDate1, fee: 111})
      fs.addFee({feeDate: feeDate2, fee: 222})
      const feeObj = fs.calculateFee(checkDate)
      assert.equal(feeObj.fee, 222)
      assert.equal(feeObj.feeDate, checkDate)
      assert.equal(feeObj.derived, true)
      assert.isNotOk(feeObj.restricted)
    })
    
    it("restricts the fee if the check date is before any fees have been set", () => {
      const fs = FeeSchedule()
      const feeDate = '2017-01-01'
      const checkDate = '2016-02-01'
      fs.addFee({feeDate, fee: 123})
      const feeObj = fs.calculateFee(checkDate)
      assert.isNotOk(feeObj.fee)
      assert.equal(feeObj.feeDate, checkDate)
      assert.equal(feeObj.derived, true)
      assert.isOk(feeObj.restricted)
    })
    it("restricts the fee if the check date is after the close date", () => {
      const fs = FeeSchedule()
      const feeDate1 = '2017-01-01'
      const feeDate2 = '2017-02-01'
      const checkDate = '2017-03-01'

      fs.addFee({feeDate: feeDate1, fee: 111})
      fs.addFee({feeDate: feeDate2, fee: 222, close: true})
      const feeObj = fs.calculateFee(checkDate)
      assert.isNotOk(feeObj.fee)
      assert.equal(feeObj.feeDate, checkDate)
      assert.equal(feeObj.derived, true)
      assert.isOk(feeObj.restricted)
    })
  })
})