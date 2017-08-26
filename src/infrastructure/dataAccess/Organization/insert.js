

module.exports = function insert(db, data, options) {
  const {organization: organizationTable} = db.tables;
  const defaults = {
    created: new Date(),
    modified: new Date()
  }

  const createData = Object.assign({}, defaults, data);

  const sql = `INSERT INTO ${organizationTable}
    (name, created, modified) VALUES
    ($[name], $[created], $[modified])
    RETURNING id`;

  return db.one(sql, createData)
    .then(ret => db.one(`SELECT * FROM ${organizationTable} WHERE id=$1`, [ret.id]) );
}
