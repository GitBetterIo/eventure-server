

module.exports = dataAccess => ({
  userRepository: require('./user.repository')(dataAccess),
})
