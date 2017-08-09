const bcrypt = require('bcrypt');



const setPassword = (user, plaintextPassword) => {
  const salt = bcrypt.genSaltSync(10);
  return Object.assign({}, user, {passwordHash: bcrypt.hashSync(plaintextPassword, salt)});
}

const passwordMatches = (plaintextPassword, user) => {
  return bcrypt.compareSync(plaintextPassword, user.passwordHash)
}

const register = (userData) => {
  userData = userData || {};

  return Promise.try(() => {
    if (!userData.username || !userData.password) {
      throw new Error('Registration requires a username and a password');
    }

    return userRepository.findByUsername(username)
  })
    .then(user => {
      if (user) throw new Error(`User ${username} already exists`);

      const savedUserData = setPassword(userData, userData.password);
      return userRepository.save(savedUserData)
    })
}


module.exports = userRepository => ({
  setPassword,
  passwordMatches,
  register,
  /**
   * Find a user by username
   * @param  {String} username The username to search
   * @return {Object}          Object representing the user
   */
  findByUsername: username => userRepository.get({username}, {limit: 1}),
  /**
  * Find a user by token
  * @param  {String} token  The token to search
  * @return {Object}          Object representing the user
  */
  findByToken: token => userRepository.get({token}, {limit: 1}),
  /**
   * Register a new User
   * @type {[type]}
   */
  createUser: userData => {
    userData = userData || {};

    if (!userData.password || !userData.username) {
      throw new Error(`Missing username or password`);
    }

    userData = setPassword(userData.password, userData);
    return userRepository.create(userData);
  },
})
