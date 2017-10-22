const isString = require('lodash/isString')
const isObject = require('lodash/isObject')

module.exports = ({eventureDataStore, listingDataStore, eventureRoot: Eventure}) => {

  async function get(organizationId, id) {
    
    if (!id || !organizationId) throw new Error(`eventureRepository requires both the eventureId and the organizationId in order to fetch an entry`)

    let data = await eventureDataStore.findOne({organizationId, id})
    let listings = await listingDataStore.find({eventureId: id, organizationId})

    if (!data) throw new Error(`Unknown Eventure '${id}'`);

    const ev = Eventure(data, listings);
    return ev;
  }

  /**
   * Saves an eventure root aggregate (and all child entities) to the database
   * 
   * @param {UUID} organizationId The organization ID to which the eventure belongs
   * @param {Object} eventure The eventure domain entity to save
   * @param {Object} options Save options
   */
  async function save(organizationId, eventure, options) {

    if (process.env.NODE_ENV !== 'production') {
      if (!isString(organizationId)) throw new Error(`Expecting organizationId to be a string.  Received ${typeof organizationId}`)
      if (!isObject(eventure)) throw new Error('Expecting eventure to be an object')
    }

    if (organizationId !== eventure.organizationId) throw new Error(`Attempting to save an eventure to another organization`)

    console.log("ALL LISTING", JSON.stringify(eventure.listings, null, 2))
    const modifiedListings = eventure.listings.getModified()
    const removedListings = eventure.listings.getRemoved()

    console.log("modified listings", modifiedListings)

    await Promise.all( modifiedListings.map(listing => listingDataStore.save(listing)) )
    await Promise.all( removedListings.map(listing => listingDataStore.remove({id: listing.id})) )
    await eventureDataStore.save(eventure)

    return get(organizationId, eventure.id)
  }

  async function remove(id, options={}) {
  
    const delMethod = (options.purge) ? 'purge' : 'remove';

    await listingDataStore[delMethod]({eventureId: id})
    await eventureDataStore[delMethod]({id})
  }

  return {get, save, remove}
}






