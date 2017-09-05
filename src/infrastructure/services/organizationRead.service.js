

module.exports = (Database) => ({
  find: (query, options) => Database.organization.find(query, options),
  findById: (id) => Database.organization.findOne({id}),
})
