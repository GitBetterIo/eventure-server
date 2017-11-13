module.exports = ({registrationRepository, registrationRoot}) => ({
  createRegistration: require('./createRegistration')({registrationRepository, registrationRoot}),
})