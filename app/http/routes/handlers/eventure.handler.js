

module.exports = ({
  list: async (req,res,next) => {
    const {eventureDataStore, currentOrganization: {id: organizationId}} = req.container.cradle;
    const query = Object.assign({}, req.query, {organizationId})

    try {
      const eventures = await eventureDataStore.find(query)
      return res.json(eventures);
    } catch (err) {
      return next(err);
    }
    
  },
  
  get: async (req, res, next) => {
    const {eventureDataStore, currentOrganization: {id: organizationId}} = req.container.cradle
    const query = {id: req.params.eventureId, organizationId}
    
    try {
      const eventure = await eventureDataStore.find(query)
      return res.json(eventure);
    } catch (err) {
      return next(err);
    }
  },

  create: async (req, res, next) => {
    const {
      eventureService,
      currentUser,
      currentOrganization: {id: organizationId}
    } = req.container.cradle;
    const data = Object.assign({}, req.body,  {organizationId});

    try {

      if (data.oneDayEvent) {
        data.endDate = data.startDate
      }

      const eventure = await eventureService.createEventure(data)
      return res.json(eventure);
    } catch (err) {
      return next(err)
    }
  }
})