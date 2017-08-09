

module.exports = function find(db, ctx, query, options) {
  const {tokenTable, userTable} = ctx;

  const whereClauses = [];
  if (query.id) whereClauses.push('u.id=${id}');
  if (query.username) whereClauses.push('u.username=${username}');
  if (query.password_reset_token) whereClauses.push('u.password_reset_token=${password_reset_token}');
  if (query.token) whereClauses.push('token.token=${token}')
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const joinClause = (query.token) ? `LEFT JOIN ${tokenTable} token on token.user_id = u.id` : '';

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'u.username ASC');


  const sql = `SELECT *
    FROM ${userTable} u ${joinClause}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return db.query(sql, query);
}
