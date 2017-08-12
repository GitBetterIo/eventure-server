

module.exports = (domain, infrastructure) => {
  const {userRepository, accessTokenService} = infrastructure;
  const {User} = domain;


  const userService = require('./User')({userRepository});
  const authService = require('./Auth')({User, userRepository, accessTokenService});

  return {
    userService,
    authService,
  };
}
