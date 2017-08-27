const hashPassword = require('./hashPassword');


module.exports = ({
  setPassword: (user, plaintextPassword) => {
    const passwordHash = hashPassword(plaintextPassword);
    const login = Object.assign({}, user.login, {passwordHash});
    return Object.assign({}, user, {login});
  },

  matchPassword: (user, plaintextPassword) => {
    return bcrypt.compareSync(plaintextPassword, user.login.passwordHash)
  }

})
