const createDatastore = require('./datastore')
const pick = require('lodash/pick');

module.exports = ({dbService}) => {
  const datastore = createDatastore({
    tableName: 'eventure_listing',
    db: dbService,
    queryable: ['id', 'eventureId', 'name'],
    fields: ['id', 'organizationId', 'eventureId', 'name', 'slug', 'description', 'startDate', 'endDate', 'settings', 'feeSchedule'],
    beforeQuery: (select, query, options) => {
      if (!query.organizationId) {
        throw new Error(`Find Listing: Missing required 'organizationId' query parameter`);
      }
    
      select.where('organization_id', query.organizationId);
    },
    beforeSave: (saveData) => {
      // node-pg converts arrays to postgres arrays, not JSON arrays. Pre-emtively stringifying
      // fee_schedule (which is an array of objects) avoids the "invalid input syntax for type json" error
      saveData.feeSchedule = JSON.stringify(saveData.feeSchedule)
    }
  })

  return datastore
}

