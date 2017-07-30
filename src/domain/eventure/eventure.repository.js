const EVENTURE_TABLE = 'ev_eventure';

module.exports = db => ({
  findById: id => find(db, {id}, {limit: 1}).then(getFirst),
})


function find(db, query, options) {

  const whereClauses = [];
  if (query.id) whereClauses.push('id=${id}');
  if (query.clientId) whereClause.push('clientId=${clientId}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'username ASC');

  const sql = `SELECT *
    FROM ${EVENTURE_TABLE}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return db.query(sql, query);
}

function save(db, eventure, options) {

}

function update(db, eventure, options) {

}

function insert(db, eventure, options) {
  
}


const getFirst = list => (list && list.length) ? list[0] : null;
