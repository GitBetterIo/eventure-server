const uuid = require('uuid/v4')


module.exports = ({helpers}) => {

  const Listing = {
  
  }
  
  const listingPrototype = Object.assign({}, Listing)
  
  const CreateListing = (listingData) => {
    const requiredFields = ['organizationId', 'eventureId', 'name']
    const missing = requiredFields.filter(fld => !listingData.hasOwnProperty(fld));
    if (missing.length) throw new Error(`Missing required fields for listing creation: [${missing.join(', ')}]`)
  
    const slug = helpers.slugify(listingData.name)
    const listing = Object.create(listingPrototype)
    
    return Object.assign(listing, listingData, {
      id: listingData.id || uuid(),
      slug
    })
  }

  return CreateListing;
}