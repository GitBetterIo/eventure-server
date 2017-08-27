const hashPassword = require('./hashPassword');

module.exports = (user, login) => {
  if (!user || !user.id) {
    throw new Error('Expeced a user object with, at least, an id');
  }

  if (!login.username || !login.password) {
    throw new Error('Expected a username and password');
  }

  const login = {
    id: user.id,
    username: profile.username,
    passwordHash: hashPassword(profile.passwordHash),
    passwordResetToken: profile.passwordResetToken,
    registrationToken: profile.registrationToken,
    registrationExpire: profile.registrationExpire,
    lastLogin: profile.lastLogin,
    _new: true
  }

  return Object.assign({}, user, {login});
}
