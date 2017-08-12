const UseCase = require('../useCase');

module.exports = ({User, userRepository, accessTokenService}) => UseCase('authenticateUserWithToken', {
  outputs: ['SUCCESS', 'FAILURE', 'ERROR'],
  execute: function(token) {

    const {SUCCESS, FAILURE, ERROR} = this.outputs;

    const accessToken = accessTokenService.findToken(token);
    const user = accessToken.then(at => (at) ? userRepository.find({id: at.userId}) : null);

    return Promise.all([accessToken, user])
      .then(([accessToken, user]) => {
        if (!accessToken || !user) return this.emit(FAILURE, 'Invalid Token');
        return this.emit(SUCCESS, user);
      })
      .catch(err => this.emit(ERROR, err));
  }
})
