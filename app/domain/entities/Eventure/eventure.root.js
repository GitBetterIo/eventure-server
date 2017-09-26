const uuid = require('uuid/v4')
const CreateCollection = require('../collection')


module.exports = ({helpers, listingEntity}) => {

  const Eventure = {
    /**
     * Adds a listing to the eventure
     * @param {object} listingData Raw data for the new listing
     */
    addListing(listingData) {
      listingData.eventureId = this.id
      listingData.organizationId = this.organizationId

      const listing = listingEntity(listingData)
      this.listings.add(listing)
    },
  }
  
  const eventurePrototype = Object.assign({}, Eventure);
  
  // Create
  const CreateEventure = (eventureData, rawListings) => {
    
    const requiredFields = ['organizationId', 'name']
    const missing = requiredFields.filter(fld => !eventureData.hasOwnProperty(fld));
    if (missing.length) throw new Error(`Missing required fields for eventure creation: [${missing.join(', ')}]`)

    // Create an array of listings
    const listings = (rawListings || []).map(listingEntity)
    const slug = helpers.slugify(eventureData.name)
    const eventure = Object.create(eventurePrototype)

    return Object.assign(eventure, eventureData, {
      id: eventureData.id || uuid(),
      slug,
      listings: CreateCollection(listings), 
    })
  }

  return CreateEventure

}
