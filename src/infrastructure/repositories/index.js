

module.exports = dataAccess => ({
  userRepository: require('./user.repository')(dataAccess),
  organizationRepository: require('./organization.repository')(dataAccess),
})
