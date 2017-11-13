module.exports = ({idService}) => {

  const Registration = {

  }

  const createRegistration = regData => {
    const required = ['eventureId', 'listingId', 'participantId']
    const missing = required.filter(fld => !regData.hasOwnProperty(fld))
    if (missing.length) {
      throw new Error(`Cannot create registration, missing [${missing.join(', ')}]`)
    }
    
    const reg = Object.create(Registration)

    return reg
  }

  return createRegistration
  
}