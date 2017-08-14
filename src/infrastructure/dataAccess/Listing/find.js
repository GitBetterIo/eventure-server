

module.exports = function find(db, query, options) {
  const {listing: listingTable} = db.tables;

  const whereClauses = [];
  if (query.id) whereClauses.push('org.id=${id}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limit = (options.limit) ? options.limit : 20;
  const limitClause = 'LIMIT ' + limit;
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = (options.orderBy) ? `ORDER BY ${options.orderBy}` : '';


  const sql = `SELECT *
    FROM ${listingTable} org
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return (limit === 1)
    ? db.one(sql, query)
    : db.query(sql, query);
}
