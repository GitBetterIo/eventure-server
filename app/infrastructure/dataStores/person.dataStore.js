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
    const snakeQuery = db.camelToSnake(query);
    const {limit=50, offset=0} = options;
  
    const selectQuery = db
      .select('*')
      .from('person')
      .limit(limit)
      .offset(offset)
  
  
    if (query.id) selectQuery.where('id', query.id);
    if (!query.deleted) selectQuery.where('deleted', 'false');
  
    return selectQuery
      .map(db.snakeToCamel)
      .then(rows => (limit===1 && rows.length) ? rows[0] : rows)
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
  
    const insert = db('person').insert(dbData);
    const update = db.update(dbData)
    const upserted = await db.raw('? ON CONFLICT (id) DO ? RETURNING *', [insert, update]);

    return db.snakeToCamel(upserted.rows[0])
  }
  
  
  async function remove(query, options) {
    return db('person').where(query).update({deleted: true});
  }
  
  
  async function purge(query, options) {
    return db('person').where(query).del();
  }

  return {find, findOne, save, remove, purge}
}

