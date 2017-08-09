

module.exports = function insert(db, ctx, data, options) {
  const {userTable} = ctx;
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


  const sql = `INSERT INTO ${userTable}
    (username, password_hash, email, first_name, last_name, created, modified) VALUES
    ($[username], $[passwordHash], $[email], $[firstName], $[lastName], $[created], $[modified])
    RETURNING id`;

  return db.one(sql, createData)
    .then(ret => db.one(`SELECT * FROM ${userTable} WHERE id=$1`, [ret.id]) );
}
