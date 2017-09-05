

module.exports = (domain, infrastructure) => {
  const {
    Entities: {Organization}
  } = domain;
  const {
    Repositories: {organizationRepository},
    Services: {organizationReadService}
  } = infrastructure;

  return {
    createOrganization: require('./createOrganization')({Organization, organizationRepository}),
    listOrganizations: require('./listOrganizations')({organizationReadService}),
    // getOrganization: require('./getOrganization')({organizationReadService}),
    // updateOrganization: require('./updateOrganization')({organizationRepository}),
  }
}
