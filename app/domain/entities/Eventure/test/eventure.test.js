const {assert} = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../../config')

describe("Eventure Entity", () => {
  let Eventure, Listing;

  before(() => {
    const container = require('../../../../container')({config})
    Eventure = container.cradle.eventureRoot
    Listing = container.cradle.listingEntity
  })

  describe("Creation", () => {
    it("creates an eventure", () => {
      const ev = {
        organizationId: uuid(),
        name: 'testEv'
      }
      const eventure = Eventure(ev)
      assert.isOk(eventure)
      assert.isString(eventure.id)
      
    })
  })
  
  describe("Listing collection", () => {
    it("adds a listing to the listing collection", () => {
      const ev = {
        organizationId: uuid(),
        name: 'testEv'
      }
      const eventure = Eventure(ev)
      const lst = {
        eventureId: eventure.id,
        name: 'testLst'
      }
      
      assert.equal(eventure.listings.length, 0)
      eventure.addListing(lst)
      assert.equal(eventure.listings.length, 1)
      
      const listing = eventure.listings.toArray()[0]
      
      assert.isOk(listing)
      assert.isFunction(listing.addFeeScheduleItem)
    })
    
    it("prevents duplicate listing names", () => {
      const ev = {
        organizationId: uuid(),
        name: 'testEv'
      }
      const eventure = Eventure(ev)
      const lst1 = { eventureId: eventure.id, name: 'testLst' }
      const lst2 = { eventureId: eventure.id, name: 'testLst' }

      eventure.addListing(lst1)
      const addDup = () => eventure.addListing(lst2)
      assert.throw(addDup)
      
    })
  })

  describe("Fee Schedule", () => {
    it("adds a fee schedule item to an identified listing", () => {
      const ev = { organizationId: uuid(), name: 'testEv' }
      const eventure = Eventure(ev)
      const lst = { eventureId: eventure.id, name: 'testLst' }
      const fee = { feeDate: new Date(), fee: 12 }
      
      eventure.addListing(lst)
      const listing = eventure.listings.toArray()[0]

      assert.equal(listing.feeSchedule.length, 0)
      eventure.addFeeScheduleItem(listing.id, fee)
      assert.equal(listing.feeSchedule.length, 1)
    })
  })
})