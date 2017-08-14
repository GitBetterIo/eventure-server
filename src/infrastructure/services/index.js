

module.exports = ({dataAccess}) => {
  const {AccessTokenDb} = dataAccess;

  return {
    accessTokenService: require('./accessToken.service')({AccessTokenDb}),
    organizationReadService: require('./organizationRead.service')({OrganizationDb: dataAccess.OrganizationDb}),
  }
}
