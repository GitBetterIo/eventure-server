const uuid = require('uuid');

module.exports = tokenRepository => {

  return {
    generateToken: () => uuid.v4(),
    registerToken: (token, user) => tokenRepository.create(token, user.id),
    removeToken: token => tokenRepository.remove(token),
  };


}
