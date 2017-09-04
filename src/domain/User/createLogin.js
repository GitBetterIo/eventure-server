const hashPassword = require('./hashPassword');

module.exports = (user, loginData) => {
  if (!user || !user.id) {
    throw new Error('Expeced a user object with, at least, an id');
  }

  if (!loginData.username || !loginData.password) {
    throw new Error('Expected a username and password');
  }

  const login = {
    id: user.id,
    username: loginData.username,
    passwordHash: hashPassword(loginData.password),
    passwordResetToken: loginData.passwordResetToken,
    registrationToken: loginData.registrationToken,
    registrationExpire: loginData.registrationExpire,
    lastLogin: loginData.lastLogin,
    _new: true
  }

  return Object.assign({}, user, {login});
}
