const UseCase = require('../useCase');


module.exports = ({User, userRepository, accessTokenService}) => UseCase('logoutUser', {
  outputs: ['SUCCESS', 'ERROR'],
  execute: function(user, token) {
    const {SUCCESS, ERROR} = this.outputs;

    accessTokenService.removeToken(token)
      .then(() => this.emit(SUCCESS))
      .catch(err => this.emit(ERROR, err))
  }
})
