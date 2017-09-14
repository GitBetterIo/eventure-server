const omit = require('lodash/omit');


module.exports = ({dbService}) => ({
  find: (query, options) => find(dbService, query, options),
  findOne: (query, options) => findOne(dbService, query, options),
  save: (data, options) => save(dbService, data, options),
  remove: (query, options) => remove(dbService, query, options),
  purge: (query, options) => purge(dbService, query, options),
})


/**
 * Generic db query for user_profile
 * 
 * @param {object} db 
 * @param {object} query 
 * @param {object} options 
 */
function find(db, query, options={}) {
  const snakeQuery = db.camelToSnake(query);
  const {limit=50, offset=0} = options;

  const selectQuery = db
    .select('*')
    .from('user_profile as profile')
    .limit(limit)
    .offset(offset)


  if (query.id) selectQuery.where('profile.id', query.id);
  if (!query.deleted) selectQuery.where('profile.deleted', 'false');

  return selectQuery
    .map(db.snakeToCamel)
    .then(rows => (limit===1 && rows.length) ? rows[0] : rows)
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
function save(db, data, options) {
  const dbData = db.camelToSnake(omit(data, 'deleted'));

  const insert = db('user_profile').insert(dbData);
  const update = db.update(dbData)
  const upsert = db.raw('? ON CONFLICT (id) DO ? RETURNING *', [insert, update]);
  return upsert
    .then(res => res.rows[0])
    .then(row => db.snakeToCamel(row));

}


function remove(db, query, options) {
  return db('user_profile').where(query).update({deleted: true});
}


function purge(db, query, options) {
  return db('user_profile').where(query).del();
}