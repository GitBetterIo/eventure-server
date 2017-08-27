

module.exports = (domain, infrastructure) => {
  const {userRepository, accessTokenService, emailService,
    organizationReadService, organizationRepository} = infrastructure;
  const {User, Organization} = domain;


  return {
    userService: require('./User')({User, userRepository, emailService}),
    authService: require('./Auth')({User, userRepository, accessTokenService}),
    organizationService: require('./Organization')({Organization, organizationRepository, organizationReadService}),
  };
}
