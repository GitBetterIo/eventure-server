

module.exports = ({config, Database}) => {
  const {AccessTokenDb} = Database;

  return {
    accessTokenService: require('./accessToken.service')({AccessTokenDb}),
    organizationReadService: require('./organizationRead.service')({OrganizationDb: Database.OrganizationDb}),
    emailService: require('./email.service')({config: config.email})
  }
}
