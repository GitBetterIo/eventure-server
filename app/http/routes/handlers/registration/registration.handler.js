const omit = require('lodash/omit')
const validateNewRegistration = require('./validateNewRegistration')

async function batchCreateRegistration(registrationService, regDatas) {
  return Promise.all(regDatas.map(registrationService.createRegistration))
}

module.exports = {
  newRegistration: [
    validateNewRegistration,
    async function(req, res, next) {
      const {registrationService, currentUser, currentOrganization: {id: organizationId}} = req.container.cradle
      const {participantIds} = req.body
      
      try {
        const baseRegistration = omit(req.body, ['participantIds'])
        const regDatas = participantIds
          .map(participantId => Object.assign({}, baseData, {organizationId, participantId}) )

        const registrations = await batchCreateRegistration(registrationService, regDatas);
        return res.json(registrations);
      } catch (err) {
        return next(err);
      }
    }
  ]
}