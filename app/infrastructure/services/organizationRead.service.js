

module.exports = ({organizationDataStore}) => ({
  find: (query, options) => organizationDataStore.find(query, options),
  findById: (id) => organizationDataStore.findOne({id}),
})
