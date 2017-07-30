
const USER_TABLE = 'ev_user';

module.exports = db => ({
  findById: id => find(db, {id}, {limit:1}).then(getFirst),
  findByUsername: username => find(db, {username}, {limit:1}).then(getFirst),
  create: userData => create(db, userData),
})


function find(db, query, options) {

  const whereClauses = [];
  if (query.id) whereClauses.push('id=${id}');
  if (query.username) whereClauses.push('username=${username}');
  if (query.password_reset_token) whereClauses.push('password_reset_token=${password_reset_token}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'username ASC');


  const sql = `SELECT *
    FROM ${USER_TABLE}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}
    `;

  return db.query(sql, query);
}

function create(db, data, options) {
  const sql = `INSERT INTO ${USER_TABLE}
    (username, password_hash, email, first_name, last_name, created, modified) VALUES (
      ${db.escape(data.username)},
      ${db.escape(data.password_hash)},
      ${db.escape(data.email)},
      ${db.escape(data.first_name)},
      ${db.escape(data.last_name)},
      ${new Date()},
      ${new Date()},
    )`;

  return db.query(sql);
}


const getFirst = list => (list && list.length) ? list[0] : null;
