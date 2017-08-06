
const USER_TABLE = 'user_login';
const TOKEN_TABLE = 'user_token';

module.exports = db => ({
  findById: id => find(db, {id}, {limit:1}).then(getFirst),
  findByUsername: username => find(db, {username}, {limit:1}).then(getFirst),
  findByToken: token => find(db, {token}, {limit:1}).then(getFirst),
  save: (userData, options) => save(db, userData, options),
})


function find(db, query, options) {

  const whereClauses = [];
  if (query.id) whereClauses.push('u.id=${id}');
  if (query.username) whereClauses.push('u.username=${username}');
  if (query.password_reset_token) whereClauses.push('u.password_reset_token=${password_reset_token}');
  if (query.token) whereClauses.push('token.token=${token}')
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const joinClause = (query.token) ? `LEFT JOIN ${TOKEN_TABLE} token on token.user_id = u.id` : '';

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'u.username ASC');


  const sql = `SELECT *
    FROM ${USER_TABLE} u ${joinClause}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}
    `;

  return db.query(sql, query);
}

function save(db, userData, options) {
  return (userData.id)
    ? update(db, userData, options)
    : create(db, userData, options);
}

function create(db, data, options) {

  const defaults = {
    username: null,
    passwordHash: null,
    email: null,
    firstName: null,
    lastName: null,
    created: new Date(),
    modified: new Date()
  }

  const createData = Object.assign({}, defaults, data);


  const sql = `INSERT INTO ${USER_TABLE}
    (username, password_hash, email, first_name, last_name, created, modified) VALUES
    ($[username], $[passwordHash], $[email], $[firstName], $[lastName], $[created], $[modified])
    RETURNING id`;

  return db.one(sql, createData)
    .then(ret => db.one(`SELECT * FROM ${USER_TABLE} WHERE id=$1`, [ret.id]) );
}

function update(db, data, options) {
  data.modified = new Date();

  const sql = `UPDATE ${USER_TABLE}
    SET
      username=$[username],
      password_hash=$[passwordHash],
      email=$[email],
      first_name=$[firstName],
      last_name=$[lastName],
      modified=$[modified]
    WHERE
      id=$[id]`;

  return db.query(sql, data);
}


const getFirst = list => (list && list.length) ? list[0] : null;
