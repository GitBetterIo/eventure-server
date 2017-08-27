const UseCase = require('../useCase');
const uuid = require('uuid/v4');


module.exports = ({User, userRepository}) => UseCase('startRegistration', {
  outputs: ['SUCCESS', 'ERROR', 'EMAIL_ERROR'],
  execute: function({username, email, password}) {
    const {SUCCESS, ERROR} = this.outputs;

    const expireMinutes = 60 * 24;
    const id = uuid();
    const registrationToken = uuid();
    const registrationExpire = moment().add(expireMinutes, 'minutes').toISOString();
    const registrationExpiresAt = moment().add(expireMinutes, 'minutes').format('MMMM Do YYYY, h:mm');

    const user = User.createProfile({id}, {email});
    const userWithLogin = User.createLogin(user, {username, password, registrationToken, registrationExpire});

    const emailData {
      username,
      registrationToken,
      registrationExpiresAt,
    };

    return userRepository.save(user)
      .catch(err => this.emit(ERROR, err))
      .then(user => emailService.sendTemplate('startRegistration', email, emailData))
      .catch(err => this.emit(EMAIL_ERROR, err))
      .then(() => this.emit(SUCCESS, {email, registrationToken, registrationExpiresAt}))

    // Create a profile & login
  }
})
