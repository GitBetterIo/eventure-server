const omit = require('lodash/omit');


module.exports = db => ({
  find: (query, options) => find(db, query, options),
  save: (data, options) => save(db, data, options),
})


function find(db, query, options) {
  const snakeQuery = db.camelToSnake(query);
  const {limit, offset, join} = options;


  if (query.passwordResetToken) join = 'login';

  const selectQuery = db
    .select('*')
    .from('user_profile as profile')
    .limit(limit)
    .offset(offset)

  if (join='login' || query.passwordResetToken || query.username) {
    selectQuery.leftjoin('user_login as login', 'profile.id', 'login.id')
  }

  if (query.id) selectQuery.where('profile.id', query.id);
  if (query.username) selectQuery.where('login.username', query.username);
  if (query.passwordResetToken) selectQuery.where('login.password_reset_token', query.passwordResetToken);

  return selectQuery
    .map(db.snakeToCamel)
    .then(rows => (limit===1 && rows.length) ? rows[0] : rows);
}


function save(db, data, options) {
  const dbData = db.camelToSnake(omit(data, 'deleted'));

  const insert = db('user_profile').insert(dbData);
  const update = db.update(dbData)
  const upsert = db.raw('? ON CONFLICT (id) DO ? RETURNING *', [insert, update]);
  return upsert
    .then(res => res.rows[0])
    .then(row => db.snakeToCamel(row));

}
