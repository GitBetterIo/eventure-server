const createDatastore = require('./datastore')

module.exports = ({dbService}) => {
  const datastore = createDatastore({
    tableName: 'person_login',
    db: dbService,
    queryable: ['id'],
  })

  return datastore
}
