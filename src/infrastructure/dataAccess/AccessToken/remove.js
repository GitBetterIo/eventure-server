

module.exports = function remove(db, ctx, token, options) {
  token = token.token || token;
  const {tokenTable} = ctx;
  const sql = `DELETE FROM ${tokenTable} WHERE token = $[token]`;
  return db.none(sql, {token});
}
