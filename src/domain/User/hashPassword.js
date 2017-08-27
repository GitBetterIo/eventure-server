const bcrypt = require('bcrypt');


module.exports = hashPassword = plaintextPassword => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintextPassword, salt)
}
