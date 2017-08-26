

module.exports = function update(db, data, options) {
  const {userProfile: profileTable} = db.tables;

  const updateDate = Object.assign({}, data, {modified: new Date()});

  const sql = `UPDATE ${profileTable}
    SET
      email=$[email],
      first_name=$[firstName],
      last_name=$[lastName],
      modified=$[modified]
    WHERE
      id=$[id]`;

  return db.query(sql, data);
}
