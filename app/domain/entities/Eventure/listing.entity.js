const uuid = require('uuid/v4')
const CreateCollection = require('../collection')
const {format: formatDate} = require('date-fns')


module.exports = ({helpers}) => {

  const Listing = {
    addFeeScheduleItem(feeScheduleData) {

      // format the date to ISO 8601 YYYY-MM-DD
      const feeDate = formatDate(new Date(feeScheduleData.feeDate), 'YYYY-MM-DD')
      const newFeeScheduleItem = Object.assign(feeScheduleData, {feeDate})

      // There can only be a one fee schedule item per day
      // TODO: Just replace the previous feeSchedule
      const existingItem = this.feeSchedule.find(i => i.feeDate === feeDate)

      if (existingItem) throw new Error(`There already exists a fee schedule item for the date ${feeDate}`)

      this.feeSchedule.push(newFeeScheduleItem)
    },
  
  }
  
  const listingPrototype = Object.assign({}, Listing)
  
  const CreateListing = (listingData) => {
    const requiredFields = ['organizationId', 'eventureId', 'name']
    const missing = requiredFields.filter(fld => !listingData.hasOwnProperty(fld));
    if (missing.length) throw new Error(`Missing required fields for listing creation: [${missing.join(', ')}]`)
  
    const slug = helpers.slugify(listingData.name)
    const feeSchedule = listingData.feeSchedule || []
    
    return Object.assign(
      Object.create(listingPrototype),
      listingData, 
      {
        id: listingData.id || uuid(),
        feeSchedule,
        slug,
      })
  }

  return CreateListing;
}