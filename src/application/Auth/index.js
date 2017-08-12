

module.exports = ({User, userRepository, accessTokenService}) => ({
  authenticateUserWithPassword: require('./authenticateUserWithPassword')({User, userRepository}),
  authenticateUserWithToken: require('./authenticateUserWithToken')({User, userRepository, accessTokenService}),
  deserializeUser: require('./deserializeUser')({userRepository}),
  loginUser: require('./loginUser')({User, userRepository, accessTokenService}),
  logoutUser: require('./logoutUser')({User, userRepository, accessTokenService}),
})
