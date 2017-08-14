

module.exports = ({Organization, organizationRepository, organizationReadService}) => ({
  createOrganization: require('./createOrganization')({Organization, organizationRepository}),
  listOrganizations: require('./listOrganizations')({organizationReadService}),
})
