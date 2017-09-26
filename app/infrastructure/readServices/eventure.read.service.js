module.exports = ({dbService: db}) => {

  /**
   * Get a single eventure identified by eventureId and organizationId
   * 
   * @param {String} Options.organizationId 
   * @param {String} Options.eventureId 
   */
  async function findById({eventureId, organizationId}) {
    if (!organizationId) throw new Error ('Missing expected `organizationId` from query')
    if (!eventureId) throw new Error ('Missing expected `eventureId` from query')

    const where = db.camelToSnake({eventureId, organizationId})

    let eventure = await db('eventure').first('*').where(where)
    let listings = await db('eventure_listing').select('*').where(where)

    if (!eventure) return null

    eventure = db.snakeToCamel(eventure)
    listings = db.snakeToCamel(listings)

    return Object.assign(eventure, {listings})
  }

  /**
   * Get a list of all eventures for an organization
   * 
   * @param {String} options.organizationId
   */
  async function findByOrganization({organizationId, ...options}) {
    if (!organizationId) throw new Error ('Missing expected `organizationId` from query')

    let where = {organizationId}
    where = db.camelToSnake(where)

    let eventures = await db('eventure').select('*').where(where)
    eventures = eventures.map(db.snakeToCamel)

    // Get only those listings belonging to found eventures
    const evIds = eventures.map(ev => ev.id)
    let listings = await db('eventure_listing').select('*').whereIn('eventure_id', evIds)
    
    // Group listings by eventureId so that they can be associated with the corresponding
    // eventure
    listings = listings.map(db.snakeToCamel).reduce( (collection, l) => {
      collection[l.eventureId] = collection[l.eventureId] || []
      collection[l.eventureId].push(l)
      return collection
    }, {})

    eventures = eventures.map(ev => Object.assign(ev, {listings: listings[ev.id]}))
    return eventures
  }

  return {
    findById, findByOrganization
  }

}