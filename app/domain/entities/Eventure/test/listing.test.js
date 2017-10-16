const {assert} = require('chai')
const config = require('../../../../../config')

describe("Listing Entity", () => {
  let Listing

  before(() => {
    const container = require('../../../../container')({config})
    Listing = container.cradle.listingEntity
  })

  it("Creates a listing", () => {
    const lData = {
      organizationId: 'abc',
      eventureId: 'def',
      name: 'testList'
    }
    const listing = Listing(lData)
    assert.isOk(listing)
  })
  
  it("Adds a slug based on the name", () => {
    const lData = {
      organizationId: 'abc',
      eventureId: 'def',
      name: 'this is a name'
    }
    const listing = Listing(lData)
    assert.isOk(listing)
    assert.isString(listing.id)
    assert.equal(listing.slug, 'this-is-a-name')
  })
  
  describe("fee schedules", () => {
    it("Adds a fee schedule item", () => {
      const lData = {
        organizationId: 'abc',
        eventureId: 'def',
        name: 'this is a name'
      }
      const listing = Listing(lData)
      const fsi = {
        listingId: listing.id,
        feeDate: new Date(),
        fee: 12,
      }
      assert.equal(listing.feeSchedule.length, 0)
      listing.addFeeScheduleItem(fsi)
      assert.equal(listing.feeSchedule.length, 1)
      
    })

    it('formats the date properly from a date object', () => {
      const d = new Date();
      const expected = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      const lData = { organizationId: 'abc', eventureId: 'def', name: 'this is a name' }
      const listing = Listing(lData)
      const fsi = {
        listingId: listing.id,
        feeDate: d,
        fee: 12,
      }
      assert.equal(listing.feeSchedule.length, 0)
      listing.addFeeScheduleItem(fsi)
      assert.equal(listing.feeSchedule.length, 1)
      assert.equal(listing.feeSchedule[0].feeDate, expected)
    })

  })
})