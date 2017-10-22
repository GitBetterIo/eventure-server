
module.exports = ({eventureRepository, eventureRoot: Eventure}) => async (organizationId, eventureId, listingId, fees) => {
  try {
    const eventure = await eventureRepository.get(organizationId, eventureId)

    eventure.updateFeeSchedule(listingId, fees)
  
    return eventureRepository.save(organizationId, eventure)
  } catch (err) {
    throw err
  }
}