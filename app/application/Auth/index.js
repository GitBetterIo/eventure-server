

module.exports = ({userReadService, userRepository, tokenService, userRoot, errors}) => {
  return {
    authenticateUserWithPassword: require('./authenticateUserWithPassword')({userReadService, userRoot, errors}),
    authenticateUserWithToken: require('./authenticateUserWithToken')({userReadService, errors}),
    deserializeUser: require('./deserializeUser')({userRepository}),
    loginUser: require('./loginUser')({tokenService, userReadService, userRoot, userRepository}),
    logoutUser: require('./logoutUser')({tokenService}),
  }
}
