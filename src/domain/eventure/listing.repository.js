const LISTING_TABLE = 'ev_listing';

module.exports = db => ({
  findById: id => find(db, {id}, {limit: 1}).then(getFirst),
})


function find(db, query, options) {

  const whereClauses = [];
  if (query.id) whereClauses.push('id=${id}');
  if (query.eventureId) whereClause.push('eventureId=${eventureId}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'username ASC');

  const sql = `SELECT *
    FROM ${LISTING_TABLE}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return db.query(sql, query);
}



const getFirst = list => (list && list.length) ? list[0] : null;
