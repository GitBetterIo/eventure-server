const bcrypt = require('bcrypt');


/**
 * Convert a plaintext string to a hash
 * Generates a new salt
 * @param {String} plaintextPassword 
 */
const hashPassword = plaintextPassword => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintextPassword, salt)
}


module.exports = ({
  setPassword: (user, plaintextPassword) => {
    const passwordHash = hashPassword(plaintextPassword);
    const login = Object.assign({}, user.login, {passwordHash});
    return Object.assign({}, user, {login});
  },

  matchPassword: (user, plaintextPassword) => {
    return user.login && bcrypt.compareSync(plaintextPassword, user.login.passwordHash)
  },

})
