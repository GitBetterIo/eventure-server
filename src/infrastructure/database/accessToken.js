

module.exports = db => ({
  find: (query, options) => find(db, query, options),
  findOne: (query, options) => findOne(db, query, options),
  save: (data, options) => save(db, data, options),
  remove: (query, options) => purge(db, query, options),
  purge: (query, options) => purge(db, query, options),
})


function find(db, query, options={}) {
  const snakeQuery = db.camelToSnake(query);
  const {limit=50, offset=0, join} = options;

  const selectQuery = db
    .select('*')
    .from('access_token')
    .limit(limit)
    .offset(offset)


  if (query.userId) selectQuery.where('user_id', query.userId);
  if (query.token) selectQuery.where('token', query.token);

  return selectQuery
    .map(db.snakeToCamel)
}

async function findOne(db, query, options) {
  const rows = await find(db, query, options);
  return (rows.length) ? rows[0] : null;
}

function save(db, data, options) {
  const dbData = db.camelToSnake(data);

  const insert = db('access_token').insert(dbData);
  const update = db.update(dbData)
  const upsert = db.raw('? ON CONFLICT (token) DO ? RETURNING *', [insert, update]);
  return upsert
    .then(res => res.rows[0])
    .then(row => db.snakeToCamel(row));

}



function purge(db, query, options) {
  return db('access_token').where(query).del();
}