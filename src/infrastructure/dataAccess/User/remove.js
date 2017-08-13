



module.exports = function remove(db, id, options) {
  const {user: userTable} = db.tables;

  const sql = `UPDATE ${userTable}
    SET
      deleted=1
    WHERE
      id=$[id]`;

  return db.query(sql, data);
}
