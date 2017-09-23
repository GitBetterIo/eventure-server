const CreateCollection = require('../collection');

module.exports = ({helpers, ListingEntity}) => {

  const Eventure = {
    /**
     * Adds a listing to the eventure
     * @param {object} listingData Raw data for the new listing
     */
    addListing(listingData) {
      listingData.eventureId = this.id
      listingData.organizationId = this.organizationId

      const listing = ListingEntity(listingData)
      this.listings.push(listing)
    },
  }
  
  const eventurePrototype = Object.assign({}, Eventure);
  
  // Create
  const CreateEventure = (eventureData, rawListings) => {
    
    const requiredFields = ['organizationId', 'name']
    const missing = requiredFields.filter(fld => !data.hasOwnProperty(fld));
    if (missing.length) throw new Error(`Missing required fields for eventure creation: [${missing.join(', ')}]`)

    // Create an array of listings
    const listings = (rawListings || []).map(ListingEntity)
    const slug = helpers.slugify(data.name)
    const eventure = Object.create(eventurePrototype)

    return Object.assign(eventure, {
      slug,
      listings: CreateCollection(listings), 
    })
  }

  return CreateEventure

}
