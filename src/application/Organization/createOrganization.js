const uuid = require('uuid/v4')

module.exports = ({Organization, organizationRepository}) => async (orgData) => {
  orgData.id = orgData.id || uuid();
  const organization = Organization.create(orgData);
  return organizationRepository.save(organization);
}
