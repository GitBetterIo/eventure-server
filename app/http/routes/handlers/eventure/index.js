const validateCreateListing = require('./validateCreateListing')

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

  /**
   * Validates listing create data and creates a new listing
   */
  create: [

    async (req, res, next) => {    

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
  ],

  addListing: [
    validateCreateListing,
    async(req, res, next) => {

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
  ],

  updateFeeSchedule: async (req, res, next) => {
    try {
      const {eventureService, currentUser, currentOrganization: {id: organizationId}} = req.container.cradle
      const { eventureId, listingId } = req.params
      const fees = req.body
      const eventure = await eventureService.updateFeeSchedule(organizationId, eventureId, listingId, fees)

      return res.json(eventure)
    } catch(err) {
      return next(err)
    }
  }
})