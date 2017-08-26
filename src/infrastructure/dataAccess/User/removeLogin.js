



module.exports = function remove(db, id, options) {
  const {userLogin: loginTable} = db.tables;

  const sql = `UPDATE ${loginTable} SET deleted=1 WHERE id=$[id]`;
  return db.query(sql, data);
}
