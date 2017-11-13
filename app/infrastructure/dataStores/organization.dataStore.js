const createDatastore = require('./datastore')

module.exports = ({dbService}) => {
  const datastore = createDatastore({
    tableName: 'organization',
    db: dbService,
    queryable: ['id', 'name'],
  })

  return datastore
}

