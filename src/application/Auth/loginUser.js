const UseCase = require('../useCase');


module.exports = ({User, userRepository, accessTokenService}) => UseCase('logInUser', {
  outputs: ['SUCCESS', 'ERROR'],
  execute: function(user) {
    const {SUCCESS, ERROR} = this.outputs;
    const token = accessTokenService.generateToken();

    const loggedInUser = User.login(user);

    Promise.all([
        userRepository.save(loggedInUser),
        accessTokenService.saveToken(token, loggedInUser.id),
      ])
      .then(([user, accessToken]) => this.emit(SUCCESS, accessToken))
      .catch(err => this.emit(ERROR, err))
  }
})
