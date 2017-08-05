

module.exports = (config, {db}) => {
  const userRepository = require('./user.repository')(db);
  const userService = require('./user.service')(userRepository);
  const authService = require('./auth.service')(config, userService);

  return {
    userService,
    authService,

    // Useful for testing
    userRepository,
  };
}
