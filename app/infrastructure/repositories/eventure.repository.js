
module.exports = ({eventureDataStore, listingDataStore, eventureRoot: Eventure}) => ({
  async get(id) {
    const data = await eventureDataStore.findOne({id})
    const listings = await listingDataStore.find({eventureId: id})
  
    if (!data) throw new Error(`Unknown Eventure '${id}'`);
  
    const ev = Eventure.create(data, listings);
    return ev;
  },

  async save(eventure, options) {

    const modifiedListings = eventure.listings.getModified()
    const removedListings = eventure.listings.getRemoved()

    return Promise.all([
      ...modifiedListings.map(listing => listingDataStore.save(listing)),
      ...removedListings.map(listing => listingDataStore.remove({id: listing.id})),
      eventureDataStore.save(eventure),
    ])

  },

  async remove(id, options={}) {
  
    const delMethod = (options.purge) ? 'purge' : 'remove';

    await listingDataStore[delMethod]({eventureId: id})
    await eventureDataStore[delMethod]({id})
  }
})






