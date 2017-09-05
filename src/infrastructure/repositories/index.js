

module.exports = ({Database, Entities}) => ({
  userRepository: require('./user.repository')(Database, Entities.User),
  organizationRepository: require('./organization.repository')(Database),
})
