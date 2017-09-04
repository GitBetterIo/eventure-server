

module.exports = ({User, userRepository, emailService}) => ({
  startRegistration: require('./startRegistration')({User, userRepository, emailService}),
})
