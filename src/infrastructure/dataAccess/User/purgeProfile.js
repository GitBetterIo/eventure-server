



module.exports = function remove(db, id, options) {
  const {userProfile: profileTable} = db.tables;

  const sql = `DELETE FROM ${profileTable} WHERE id=$[id]`;
  return db.query(sql, {id});
}
