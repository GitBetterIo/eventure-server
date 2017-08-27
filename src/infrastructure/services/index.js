

module.exports = ({config, dataAccess}) => {
  const {AccessTokenDb} = dataAccess;

  return {
    accessTokenService: require('./accessToken.service')({AccessTokenDb}),
    organizationReadService: require('./organizationRead.service')({OrganizationDb: dataAccess.OrganizationDb}),
    emailService: require('./email.service')({config: config.email})
  }
}
