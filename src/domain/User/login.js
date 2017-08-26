

module.exports = user => {
  const login = Object.assign({}, user.login, {lastLogin: new Date()});
  return Object.assign({}, user, {login});
}
