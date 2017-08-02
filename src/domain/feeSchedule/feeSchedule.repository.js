
const SCHEDULE_TABLE = 'ev_fee_schedule';
const SCHEDULE_RULE_TABLE = 'ev_fee_schedule_rule';

module.exports = db => ({
  findByListing: listingId => find(db, {listingId}),
})


function find(db, query, options) {

  const whereClauses = [];
  if (query.listingId) whereClauses.push('listing_id=${listingId}');
  const whereClause = whereClauses.join(' AND ');

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'id ASC');

  const sql = `SELECT *
    FROM ${SCHEDULE_TABLE}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return db.query(sql, query)
    .then(rules => ({ listingId, rules }) )
}

const getFirst = list => (list && list.length) ? list[0] : null;
