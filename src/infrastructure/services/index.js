

module.exports = ({config, Database, Entities}) => {
  const {AccessTokenDb} = Database;
  const {User} = Entities;

  return {
    authService: require('./auth.service')({Database, User}),
    accessTokenService: require('./accessToken.service')({AccessTokenDb}),
    organizationReadService: require('./organizationRead.service')({OrganizationDb: Database.OrganizationDb}),
    emailService: require('./email.service')({config: config.email})
  }
}
