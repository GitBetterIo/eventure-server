const UseCase = require('../useCase');

module.exports = ({User, userRepository}) => UseCase('authenticateUserWithPassword', {
  outputs: ['SUCCESS', 'FAILURE', 'ERROR'],
  execute: function(username, password) {

    const {SUCCESS, FAILURE, ERROR} = this.outputs;

    return userRepository.find({username}, {limit: 1})
      .then(user => {
        if (!user) return this.emit(FAILURE, `Unknown username '${username}'`);
        if (!User.matchPassword(user, password)) return this.emit(FAILURE, `Incorrect username or password`);

        return this.emit(SUCCESS, user);
      })
      .catch(err => this.emit(ERROR, err));
  }
})
