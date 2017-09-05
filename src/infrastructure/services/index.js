

module.exports = ({config, Database, Entities}) => {
  const {AccessTokenDb} = Database;
  const {User} = Entities;

  return {
    authService: require('./auth.service')({Database, User}),
    organizationReadService: require('./organizationRead.service')(Database),
    emailService: require('./email.service')({config: config.email})
  }
}
