



module.exports = function remove(db, id, options) {
  const {userProfile: profileTable} = db.tables;

  const sql = `UPDATE ${profileTable} SET deleted=1 WHERE id=$[id]`;
  return db.query(sql, data);
}
