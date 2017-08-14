

module.exports = (domain, infrastructure) => {
  const {userRepository, accessTokenService,
    organizationReadService, organizationRepository} = infrastructure;
  const {User, Organization} = domain;


  return {
    userService: require('./User')({userRepository}),
    authService: require('./Auth')({User, userRepository, accessTokenService}),
    organizationService: require('./Organization')({Organization, organizationRepository, organizationReadService}),
  };
}
