

module.exports = ({OrganizationDb}) => ({
  find: (query, options) => OrganizationDb.find(query, options),
})
