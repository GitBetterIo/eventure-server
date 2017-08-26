const bcrypt = require('bcrypt');



module.exports = ({
  setPassword: (user, plaintextPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const login = Object.assign({}, user.login, {passwordHash: bcrypt.hashSync(plaintextPassword, salt)});
    return Object.assign({}, user, {login});
  },

  matchPassword: (user, plaintextPassword) => {
    return bcrypt.compareSync(plaintextPassword, user.login.passwordHash)
  }

})
