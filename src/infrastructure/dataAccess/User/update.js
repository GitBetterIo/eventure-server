

module.exports = function update(db, data, options) {
  const {user: userTable} = db.tables;

  const updateDate = Object.assign({}, data, {modified: new Date()});

  const sql = `UPDATE ${userTable}
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
