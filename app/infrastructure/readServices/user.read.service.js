module.exports = ({ dbService: db }) => {

  async function findUserByUsername(username)  {
    const login = await db
      .first('*')
      .from('user_login')
      .where('username', username)

    if (!login) return null

    let user = await db.first('*').from('user_profile').where('id', login.id)
    user = db.snakeToCamel(user)
    user.login = db.snakeToCamel(login)

    return user

  }
  
  async function findUserByToken(token) {
    const accessToken = await db('access_token').first('*').where('token', token)
    if (!accessToken) return null;

    return findUserById(accessToken.user_id)
  }

  async function findUserById(id) {
    let profile = await db('user_profile').first('*').where('id', id)
    let login = await db('user_login').first('*').where('id', id)

    profile = db.snakeToCamel(profile)
    login = db.snakeToCamel(login)

    return (profile) ? Object.assign(profile, {login}) : null;
  }

  return {
    findUserByUsername,
    findUserByToken,
    findUserById,
  }
  
}