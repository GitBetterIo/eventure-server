const omit = require('lodash/omit');


module.exports = ({dbService: db}) => {
  /**
   * Generic db query for person table
   * 
   * @param {object} db 
   * @param {object} query 
   * @param {object} options 
   */
  async function find(query, options={}) {
    const {limit, offset=0} = options;
  
    const selectQuery = db('fee_schedule').select('*')

    if (limit) selectQuery.limit(limit).offset(offset)
  
    if (query.id) selectQuery.where('id', query.id);
    if (query.organizationId) selectQuery.where('organization_id', query.organizationId)
    if (query.eventureId) selectQuery.where('eventure_id', query.eventureId)
    if (query.listingId) selectQuery.where('listing_id', query.listingId)
  
    return selectQuery.map(db.snakeToCamel)
  }
  
  async function findOne(query, options) {
    const rows = await find(query, options);
    return (rows.length) ? rows[0] : null;
  }
  
  
  /**
   * 
   * @param {object} db 
   * @param {object} data 
   * @param {object} options 
   */
  async function save(data, options) {
    const dbData = db.camelToSnake(omit(data, 'deleted'));

    const insert = db('fee_schedule').insert(dbData);
    const update = db.update(dbData)
    const upserted = await db.raw('? ON CONFLICT (id) DO ? RETURNING *', [insert, update]);

    return db.snakeToCamel(upserted.rows[0])
  }
  
  
  async function remove(query, options) {
    return purge(query, options)
  }
  
  
  async function purge(query, options) {
    return db('fee_schedule').where(query).del();
  }

  return {find, findOne, save, remove, purge}
}

