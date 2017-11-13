const uuid = require('uuid/v4')

module.exports = ({eventureRepository, eventureRoot: Eventure}) => async (organizationId, eventureId, listingData) => {
  try {
    const listingId = uuid()
    const eventure = await eventureRepository.get(organizationId, eventureId)

    eventure.addListing({...listingData, id: listingId})

    if (listingData.registrationOpenDate && listingData.price) {
      eventure.addFee(listingId, {
        feeDate: listingData.registrationOpenDate,
        fee: listingData.price
      })
    }
  
    return eventureRepository.save(organizationId, eventure)
  } catch (err) {
    throw err
  }
}