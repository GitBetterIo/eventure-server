
module.exports = ({OrganizationDb}) => ({
  find: (query, options) => {
    options = options || {};

    return OrganizationDb.find(query, {limit: 1});
  },

  list: (query, options) => OrganizationDb.find(query, options),
  save: (data, options) => (data.id) ? OrganizationDb.update(data, options) : OrganizationDb.insert(data, options),
  // remove: (id, options) => OrganizationDb.remove(id, options),

})
