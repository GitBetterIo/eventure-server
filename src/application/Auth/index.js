

module.exports = (domain, infrastructure) => {
  const {authService, errors,
    Repositories: {userRepository}
  } = infrastructure;
  const {
    Entities: {User}
  } = domain;

  return {
    authenticateUserWithPassword: require('./authenticateUserWithPassword')({authService, User, errors}),
    authenticateUserWithToken: require('./authenticateUserWithToken')({authService, errors}),
    deserializeUser: require('./deserializeUser')({userRepository}),
    loginUser: require('./loginUser')({authService, User, userRepository}),
    logoutUser: require('./logoutUser')({authService}),
  }
}
