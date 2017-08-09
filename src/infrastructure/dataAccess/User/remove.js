



module.exports = function remove(db, ctx, id, options) {
  const {userTable} = ctx;

  const sql = `UPDATE ${userTable}
    SET
      deleted=1
    WHERE
      id=$[id]`;

  return db.query(sql, data);
}
