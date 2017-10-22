const uuid = require('uuid/v4')
const omit = require('lodash/omit')


module.exports = ({helpers, feeScheduleObject: FeeSchedule}) => {

  const Listing = {
    addFee(fee) {
      return this.feeSchedule.addFee(fee)
    },
  
  }
  
  const listingPrototype = Object.assign({}, Listing)
  
  const CreateListing = (listingData) => {
    const requiredFields = ['organizationId', 'eventureId', 'name']
    const missing = requiredFields.filter(fld => !listingData.hasOwnProperty(fld));

    if (missing.length) {
      throw new Error(`Missing required fields for listing creation: [${missing.join(', ')}]`)
    }
  
    return Object.assign(
      Object.create(listingPrototype),
      omit(listingData, ['feeSchedule']), 
      {
        id: listingData.id || uuid(),
        slug: helpers.slugify(listingData.name),
        feeSchedule: FeeSchedule(listingData.feeSchedule),
      })
  }

  return CreateListing;
}