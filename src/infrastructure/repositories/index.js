

module.exports = dataAccess => ({
  userRepository: require('./User')(dataAccess),
})
