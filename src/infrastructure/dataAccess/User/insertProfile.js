

module.exports = function insert(db, data, options) {
  const {userProfile: profileTable} = db.tables;
  const defaults = {
    created: new Date(),
    modified: new Date()
  }

  const createData = Object.assign({}, defaults, data);


  const sql = `INSERT INTO ${profileTable}
    (id, email, first_name, last_name, created, modified) VALUES
    ($[id], $[email], $[firstName], $[lastName], $[created], $[modified])
    RETURNING id`;

  return db.one(sql, createData)
    .then(ret => db.one(`SELECT * FROM ${profileTable} WHERE id=$1`, [ret.id]) );
}
