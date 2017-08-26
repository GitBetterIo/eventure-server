

module.exports = function update(db, data, options) {
  const {userLogin: loginTable} = db.tables;

  const updateDate = Object.assign({}, data, {modified: new Date()});

  const sql = `UPDATE ${loginTable}
    SET
      username=$[username],
      password_hash=$[passwordHash],
      password_reset_token=$[passwordResetToken],
      registration_token=$[registrationToken],
      registration_expire=$[registrationExpire],
      last_login=$[lastLogin],
      modified=$[modified]
    WHERE
      id=$[id]`;

  return db.query(sql, data);
}
