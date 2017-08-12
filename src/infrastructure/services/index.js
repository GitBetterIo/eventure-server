

module.exports = ({dataAccess}) => {
  const {AccessTokenDb} = dataAccess;

  return {
    accessTokenService: require('./accessToken.service')({AccessTokenDb}),
  }
}
