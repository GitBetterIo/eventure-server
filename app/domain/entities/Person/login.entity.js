const omit = require('lodash/omit');
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



module.exports = ({helpers}) => {

  const Login = {
    /**
     * Hashes the passed plaintext password and stores it as 'passwordHash'
     * @param {String} plaintextPassword Password as plaintext
     */
    setPassword(plaintextPassword) {
      this.passwordHash = hashPassword(plaintextPassword)
      return this
    },

    /**
     * Compares the trial password (hashed) to the passwordhash
     * @param {String} plaintextPassword The trial password
     */
    matchPassword(plaintextPassword) {
      return bcrypt.compareSync(plaintextPassword, this.passwordHash)
    },

    /**
     * Updates the login entity with information about the latest login
     */
    login() {
      this.lastLogin = new Date();
      return this;    
    },
    
  }
  
  const loginPrototype = Object.assign({}, Login)
  
  const CreateLogin = (loginData) => {
    const missing = helpers.getMissingProps(['id'], loginData)
    if (missing.length) throw new Error(`Missing required properties for User Login: [${missing.join(',')}]`)

    const login = Object.assign(
      Object.create(loginPrototype),
      omit(loginData, ['password'])
    )

    if (loginData.password) {
      login.setPassword(loginData.password)
    }

    // If we don't have a passwordHash at this point, it is an invalid login
    if (!login.passwordHash) throw new Error(`Missing password or password hash from User Login`)

    return login;
  }

  return CreateLogin;
}


