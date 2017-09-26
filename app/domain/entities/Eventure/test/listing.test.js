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
    assert.equal(listing.slug, 'this-is-a-name')

  })
})