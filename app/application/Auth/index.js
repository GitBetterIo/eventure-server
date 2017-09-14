

module.exports = ({userReadService, userRepository, tokenService, userEntity, errors}) => {
  return {
    authenticateUserWithPassword: require('./authenticateUserWithPassword')({userReadService, userEntity, errors}),
    authenticateUserWithToken: require('./authenticateUserWithToken')({userReadService, errors}),
    deserializeUser: require('./deserializeUser')({userRepository}),
    loginUser: require('./loginUser')({tokenService, userReadService, userEntity, userRepository}),
    logoutUser: require('./logoutUser')({tokenService}),
  }
}
