

module.exports = function find(db, ctx, query, options) {
  const {tokenTable} = ctx;
  const whereClauses = [];
  if (query.token) whereClauses.push('token=${token}')
  if (query.userId) whereClauses.push('userId=${userId}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limit = (options.limit) ? options.limit : 20;
  const limitClause = `LIMIT ${limit}`;
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);


  const sql = `SELECT *
    FROM ${tokenTable}
    ${whereClause}
    ${limitClause}`;

  return (limit === 1)
    ? db.one(sql, query)
    : db.query(sql, query);
}
