
const USER_TABLE = 'user_login';

module.exports = db => ({
  findById: id => find(db, {id}, {limit:1}).then(getFirst),
  findByUsername: username => find(db, {username}, {limit:1}).then(getFirst),
  save: (userData, options) => save(db, userData, options),
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
    ($[username], $[passwordHash], $[email], $[firstName], $[lastName], $[created], $[modified])`;

  return db.query(sql, createData);
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
