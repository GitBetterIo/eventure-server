

module.exports = (infrastructure) => {
  const userService = require('./user.service')(userRepository);
  const authService = require('./auth.service')(tokenRepository);


  return {
    userService,
    authService,

    // Useful for testing
    userRepository,
    tokenRepository,
  };
}
