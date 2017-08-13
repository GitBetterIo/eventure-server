

module.exports = function find(db, query, options) {
  const {user: userTable} = db.tables;

  const whereClauses = [];
  if (query.id) whereClauses.push('u.id=${id}');
  if (query.username) whereClauses.push('u.username=${username}');
  if (query.password_reset_token) whereClauses.push('u.password_reset_token=${password_reset_token}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limit = (options.limit) ? options.limit : 20;
  const limitClause = 'LIMIT ' + limit;
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'u.username ASC');


  const sql = `SELECT *
    FROM ${userTable} u
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return (limit === 1)
    ? db.one(sql, query)
    : db.query(sql, query);
}
