const TOKEN_TABLE = 'user_token';

module.exports = db => ({
  findToken: token => find(db, {token}, {limit: 1}).then(getFirst),
  findForUser: userId => find(db, {userId}),
  remove: token => remove(db, token),
  create: (token, userId) => create(db, {token, userId}),
});


function find(db, query, options) {
  const whereClauses = [];
  if (query.token) whereClause.push('token=${token}')
  if (query.userId) whereClauses.push('userId=${userId}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);


  const sql = `SELECT *
    FROM ${TOKEN_TABLE}
    ${whereClause}
    ${orderClause}
    ${limitClause}`;

  return db.query(sql, query);
}

function create(db, data, options) {
  const sql = `INSERT INTO ${TOKEN_TABLE} (token, user_id) VALUES ($[token], $[userId])`;
  return db.query(sql, data);
}

function remove(db, token, options) {
  const sql = `DELETE FROM ${TOKEN_TABLE} WHERE token = $[token]`;
  return db.query(sql, data);
}


const getFirst = list => (list && list.length) ? list[0] : null;
