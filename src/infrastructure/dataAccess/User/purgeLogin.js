



module.exports = function remove(db, id, options) {
  const {userLogin: loginTable} = db.tables;

  const sql = `DELETE FROM ${loginTable} WHERE id=$[id]`;
  return db.query(sql, {id});
}
