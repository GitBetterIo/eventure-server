

module.exports = ({eventureRepository, eventureRoot: Eventure}) => async (organizationId, eventureId, listingData) => {
  try {
    const eventure = await eventureRepository.get(organizationId, eventureId)
    eventure.addListing(listingData)
  
    return eventureRepository.save(organizationId, eventure)
  } catch (err) {
    throw err
  }
}