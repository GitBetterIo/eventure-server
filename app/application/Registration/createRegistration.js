module.exports = ({
  personRespository,
  eventureRepository,
  registrationRepository, 
  registrationRoot,
}) => async newRegistrationData => {

  const {organizationId, eventureId, participantId} = newRegistrationData
  const eventure = await eventureRepository.get(organizationId, eventureId)
  const participant = await personRespository.get(organizationId, participantId)

  if (!eventure) {
    throw new Error(`Could not find eventure ${eventureId} in organization ${organizationId}`)
  }

  if (!participant) {
    throw new Error(`Could not find participant ${participantId} in organization ${organizationId}`)
  }

  // Determine if we can register
    // All required questions answered
    // Payment supplied if required
  // Create an invoice
  // Create a registration
  const reg = registrationRoot(newRegistrationData)
  // Create a payment if we have one

  return registrationRepository.save(reg)
}