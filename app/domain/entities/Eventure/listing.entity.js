

module.exports = () => {

  const Listing = {
  
  }
  
  const listingPrototype = Object.assign({}, Listing)
  
  const CreateListing = (listingData) => {
    const requiredFields = ['organizationId', 'eventureId', 'name']
    const missing = requiredFields.filter(fld => !listingData.hasOwnProperty(fld));
    if (missing.length) throw new Error(`Missing required fields for listing creation: [${missing.join(', ')}]`)
  
    const listing = Object.create(listingPrototype)
    
    return Object.assign(listing, listingData)
  }

  return CreateListing;
}