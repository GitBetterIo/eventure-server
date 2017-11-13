const pick = require('lodash/pick');
const createDatastore = require('./datastore')

module.exports = ({dbService}) => {
  const datastore = createDatastore({
    tableName: 'eventure',
    db: dbService,
    queryable: ['id', 'name', 'slug'],
    fields: ['id', 'organizationId', 'name', 'slug', 'description', 'startDate', 'endDate', 'settings', 'active'],
    beforeQuery: (select, query) => {
      if (!query.organizationId) {
        throw new Error(`Find Eventure: Missing required 'organizationId' query parameter`);
      }
    
      select.where('organization_id', query.organizationId);
    }
  })

  return datastore
}
