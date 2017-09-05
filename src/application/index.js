

module.exports = (domain, infrastructure) => {
  const {userRepository, accessTokenService, emailService,
    organizationReadService, organizationRepository} = infrastructure;
  const {User, Organization} = domain;


  return {
    authService: require('./Auth')(domain, infrastructure),
    userService: require('./User')({User, userRepository, emailService}),
    organizationService: require('./Organization')({Organization, organizationRepository, organizationReadService}),
  };
}
