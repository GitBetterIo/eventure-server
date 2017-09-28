

module.exports = ({personRoot, personRepository}) => ({
  // startRegistration: require('./startRegistration')({User, userRepository, emailService}),
  updatePerson: require('./updatePerson')({personRoot, personRepository}),
})
