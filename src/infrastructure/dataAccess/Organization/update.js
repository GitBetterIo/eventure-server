

module.exports = function update(db, data, options) {
  const {organization: organizationTable} = db.tables;

  const updateDate = Object.assign({}, data, {modified: new Date()});

  const sql = `UPDATE ${organizationTable}
    SET
      name=$[name],
      modified=$[modified]
    WHERE
      id=$[id]`;

  return db.query(sql, data);
}
