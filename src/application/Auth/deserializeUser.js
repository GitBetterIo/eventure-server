const UseCase = require('../useCase');

module.exports = ({userRepository}) => UseCase('deserializeUser', {
  outputs: ['SUCCESS', 'ERROR'],
  execute: function(serializedUser) {

    const {SUCCESS, ERROR} = this.outputs;
    const id = serializedUser;

    return userRepository.find({id}, {limit: 1})
      .then(user => this.emit(SUCCESS, user))
      .catch(err => this.emit(ERROR, err));
  }
})
