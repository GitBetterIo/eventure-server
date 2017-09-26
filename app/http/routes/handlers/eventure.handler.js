

module.exports = ({
  list: async (req,res,next) => {
    const {eventureReadService, currentOrganization: {id: organizationId}} = req.container.cradle;
    const query = Object.assign({}, req.query, {organizationId})

    try {
      const eventures = await eventureReadService.findByOrganization(query)
      return res.json(eventures);
    } catch (err) {
      return next(err);
    }
    
  },
  
  get: async (req, res, next) => {
    const {eventureReadService, currentOrganization: {id: organizationId}} = req.container.cradle
    const query = {id: req.params.eventureId, organizationId}
    
    try {
      const eventure = await eventureReadService.findById(query)
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

      const eventure = await eventureService.createEventure(organizationId, data)
      return res.json(eventure);
    } catch (err) {
      return next(err)
    }
  },

  addListing: async(req, res, next) => {

    try {
      const {eventureService, currentUser, currentOrganization: {id: organizationId}} = req.container.cradle
      const listingData = Object.assign({}, req.body, {organizationId})
      const { eventureId } = req.params
      const eventure = await eventureService.addListingToEventure(organizationId, eventureId, listingData)

      return res.json(eventure)
    } catch(err) {
      return next(err)
    }
  }
})