

module.exports = function remove(db, token, options) {
  token = token.token || token;
  const {accessToken: tokenTable} = db.tables;
  const sql = `DELETE FROM ${tokenTable} WHERE token = $[token]`;
  return db.none(sql, {token});
}
