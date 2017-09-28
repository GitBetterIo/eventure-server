
module.exports = {
  list: async function(req, res, next) {
    const {
      personReadService,
      currentOrganization: {id: organizationId}
    } = req.container.cradle
    
    try {
      const people = await personReadService.findByOrganization({organizationId})
      return res.json(people)
    } catch (err) {
      return next(err)
    }
    
  },
  
  update: async function(req, res, next) {
    const {
      personService,
      currentOrganization: {id: organizationId},
    } = req.container.cradle
    const {personId} = req.params
    const personData = Object.assign({}, req.body, {id: personId})

    try {
      const updatedPerson = await personService.updatePerson(organizationId, personData)
      return res.json(updatedPerson)
    } catch(err) {
      return next(err)
    }
  },

  me: function(req, res, next) {
    res.json(req.user);
  }
}