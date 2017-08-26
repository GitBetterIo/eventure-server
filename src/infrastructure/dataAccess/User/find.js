

module.exports = function find(db, query, options) {
  const {userProfile: profileTable, userLogin: loginTable} = db.tables;

  const whereClauses = [];
  if (query.id) whereClauses.push('profile.id=${id}');
  if (query.username) whereClauses.push('login.username=${username}');
  if (query.password_reset_token) whereClauses.push('login.password_reset_token=${password_reset_token}');
  const whereClause = (whereClauses.length) ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const limit = (options.limit) ? options.limit : 20;
  const limitClause = 'LIMIT ' + limit;
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'profile.created ASC');


  const sql = `SELECT
      profile.id,
      profile.email,
      profile.first_name,
      profile.last_name,
      profile.created,
      profile.modified,
      profile.deleted,

      login.id as login$id,
      login.username as login$username,
      login.password_hash as login$password_hash,
      login.password_reset_token as login$password_reset_token,
      login.registration_token as login$registration_token,
      login.registration_expire as login$registration_expire,
      login.last_login as login$last_login,
      login.created as login$created,
      login.modified as login$modified,
      login.deleted as login$deleted

    FROM
      ${profileTable} profile
      LEFT JOIN ${loginTable} login on login.id = profile.id
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

  return (limit === 1)
    ? db.one(sql, query)
    : db.query(sql, query);
}
