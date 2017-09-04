

module.exports = ({Database, Entities}) => ({
  userRepository: require('./user.repository')(Database),
  organizationRepository: require('./organization.repository')(Database),
})
