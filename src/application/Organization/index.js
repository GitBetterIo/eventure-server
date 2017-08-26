

module.exports = ({Organization, organizationRepository, organizationReadService}) => ({
  createOrganization: require('./createOrganization')({Organization, organizationRepository}),
  listOrganizations: require('./listOrganizations')({organizationReadService}),
  getOrganization: require('./getOrganization')({organizationReadService}),
  updateOrganization: require('./updateOrganization')({organizationRepository}),
})
