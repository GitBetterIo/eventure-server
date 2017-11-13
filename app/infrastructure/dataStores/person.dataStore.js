const createDatastore = require('./datastore')

module.exports = ({dbService: db}) => {
  const datastore = createDatastore({
    tableName: 'person',
    db,
    queryable: ['id', 'organizationId'],
  })

  return datastore
}



