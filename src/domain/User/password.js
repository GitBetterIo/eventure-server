const bcrypt = require('bcrypt');



module.exports = ({
  setPassword: (user, plaintextPassword) => {
    const salt = bcrypt.genSaltSync(10);
    return Object.assign({}, user, {passwordHash: bcrypt.hashSync(plaintextPassword, salt)});
  },

  matchPassword: (user, plaintextPassword) => {
    return bcrypt.compareSync(plaintextPassword, user.passwordHash)
  }

})
