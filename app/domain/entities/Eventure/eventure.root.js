const CreateCollection = require('../collection')


module.exports = ({helpers, listingEntity, idService}) => {

  const Eventure = {
    /**
     * Adds a listing to the eventure
     * @param {object} listingData Raw data for the new listing
     */
    addListing(listingData) {
      listingData.eventureId = this.id
      listingData.organizationId = this.organizationId

      const testName = listingData.name;
      if (this.listings.find(l => l.name === testName)) throw new Error(`Cannot add listing.  Duplicate name '${testName}'`)

      const listing = listingEntity(listingData)
      this.listings.add(listing)

      return listing
    },

    /**
     * Adds a fee schedule item to the fee schedule of the identified listing
     * 
     * @param {uuid} listingId ID of the listing to edit
     * @param {object} feeSchedule The fee schedule item to add
     */
    addFee(listingId, feeSchedule) {
      const listing = this.listings.get(listingId)

      if (!listing) throw new Error(`Cannot add fee schedule item: can't find listing`)
      
      listing.addFee(feeSchedule)
      
      return this
    },
    
    updateFeeSchedule(listingId, fees) {
      const listing = this.listings.get(listingId)
      if (!listing) throw new Error(`Cannot update fee schedule item: can't find listing ${listingId}`)

      fees.forEach(fee => listing.addFee(fee))

      return this
    },
  }
  
  const eventurePrototype = Object.assign({}, Eventure);
  
  // Create
  const CreateEventure = (eventureData, rawListings, feeSchedule=[]) => {
    
    const requiredFields = ['organizationId', 'name']
    const missing = requiredFields.filter(fld => !eventureData.hasOwnProperty(fld));
    if (missing.length) throw new Error(`Missing required fields for eventure creation: [${missing.join(', ')}]`)

    // Create an array of listings
    const listings = (rawListings || []).map(listing => {
      const listingFeeSchedule = feeSchedule.filter(fs => fs.listingId === listing.id)
      return listingEntity(listing, listingFeeSchedule)
    })
    const slug = helpers.slugify(eventureData.name)
    const eventure = Object.create(eventurePrototype)

    return Object.assign(
      Object.create(eventurePrototype), 
      eventureData, 
      {
        id: eventureData.id || idService.createId(),
        slug,
        listings: CreateCollection(listings), 
      })
  }

  return CreateEventure

}
