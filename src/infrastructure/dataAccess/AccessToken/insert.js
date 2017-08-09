

module.exports = function create(db, ctx, data, options) {
  const {tokenTable} = ctx;
  const sql = `INSERT INTO ${tokenTable} (token, user_id) VALUES ($[token], $[userId]) RETURNING token`;

  return db.one(sql, createData)
    .then(ret => db.one(`SELECT * FROM ${tokenTable} WHERE token=$1`, [ret.token]) );
}
