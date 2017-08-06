

module.exports = (config, {db}) => {
  const userRepository = require('./user.repository')(db);
  const tokenRepository = require('./token.repository')(db);
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
