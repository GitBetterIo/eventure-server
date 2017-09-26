

module.exports = ({personReadService, personRepository, tokenService, personRoot, errors}) => {
  return {
    authenticateUserWithPassword: require('./authenticateUserWithPassword')({personReadService, personRoot, errors}),
    authenticateUserWithToken: require('./authenticateUserWithToken')({personReadService, errors}),
    deserializeUser: require('./deserializeUser')({personRepository}),
    loginUser: require('./loginUser')({tokenService, personReadService, personRoot, personRepository}),
    logoutUser: require('./logoutUser')({tokenService}),
  }
}
