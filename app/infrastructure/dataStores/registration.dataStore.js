const createDatastore = require('./datastore')

module.exports = ({dbService}) => {
  const datastore = createDatastore({
    tableName: 'registration',
    db: dbService,
    queryable: ['id', 'eventureId', 'listingId', 'groupId', 'participantId'],
  })

  return datastore
}

