

module.exports = ({OrganizationDb}) => ({
  find: (query, options) => OrganizationDb.find(query, options),
  findById: (id) => OrganizationDb.find({id}, {limit: 1}),
})
