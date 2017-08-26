

module.exports = function insert(db, data, options) {
  const {userLogin: loginTable} = db.tables;
  const defaults = {
    loginCreated: new Date(),
    loginModified: new Date()
  }

  const createData = Object.assign({}, defaults, data);


  const sql = `INSERT INTO ${loginTable}
    (username, password_hash, created, modified) VALUES
    ($[username], $[passwordHash], $[created], $[modified])
    RETURNING id`;

  return db.one(sql, createData)
    .then(ret => db.one(`SELECT * FROM ${loginTable} WHERE id=$1`, [ret.id]) );
}
