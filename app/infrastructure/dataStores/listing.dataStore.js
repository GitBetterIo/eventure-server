const pick = require('lodash/pick');


module.exports = ({dbService}) => ({
  find: (query, options) => find(dbService, query, options),
  findOne: (query, options) => findOne(dbService, query, options),
  save: (data, options) => save(dbService, data, options),
  remove: (query, options) => remove(dbService, query, options),
  purge: (query, options) => purge(dbService, query, options),
})


/**
 * Generic db query
 * 
 * @param {object} db 
 * @param {object} query 
 * @param {object} options 
 */
async function find(db, query, options={}) {
  const snakeQuery = db.camelToSnake(query);
  const {limit=50, offset=0, join} = options;

  const selectQuery = db
    .select('*')
    .from('eventure_listing')
    .limit(limit)
    .offset(offset)

  if (!query.organizationId) {
    throw new Error(`Find Listing: Missing required 'organizationId' query parameter`);
  }

  selectQuery.where('organization_id', query.organizationId);
  if (query.eventureId) selectQuery.where('eventure_id', query.eventureId)
  if (query.id) selectQuery.where('id', query.id);
  if (query.name) selectQuery.where('name', query.name);
  if (!query.deleted) selectQuery.where('deleted', 'false');

  return selectQuery
    .map(db.snakeToCamel)
}


async function findOne(db, query, options) {
  const rows = await find(db, query, options);
  return (rows.length) ? rows[0] : null;
}

/**
 * 
 * @param {object} db 
 * @param {object} data 
 * @param {object} options 
 */
async function save(db, data, options) {
  const required = ['id', 'organizationId', 'eventureId', 'name', 'slug', 'startDate', 'endDate']
  const missing = required.filter(fld => !data.hasOwnProperty(fld))
  if (missing.length) throw new Error(`Missing required field(s) in save listing: [${missing.join(', ')}]`)

  const saveFields = ['id', 'organizationId', 'eventureId', 'name', 'slug', 'description', 'startDate', 'endDate', 'settings', 'feeSchedule']
  const dbData = db.camelToSnake(pick(data, saveFields));

  // node-pg converts arrays to postgres arrays, not JSON arrays. Pre-emtively stringifying
  // fee_schedule (which is an array of objects) avoids the "invalid input syntax for type json" error
  dbData.fee_schedule = JSON.stringify(dbData.fee_schedule)

  const insert = db('eventure_listing').insert(dbData);
  const update = db.update(dbData)
  const upsert = db.raw('? ON CONFLICT (id) DO ? RETURNING *', [insert, update]);
  return upsert
    .then(res => res.rows[0])
    .then(row => db.snakeToCamel(row))

}


function remove(db, query, options) {
  return db('eventureListing').where(query).update({deleted: true});
}


function purge(db, query, options) {
  return db('eventureListing').where(query).del();
}