
module.exports = ({OrganizationDb}) => ({
  find: (query, options) => find(OrganizationDb, query, options),
  list: (query, options) => OrganizationDb.find(query, options),
  save: (data, options) => (data.id)
    ? OrganizationDb.update(data, options).then(({id}) => find(OrganizationDb, {id}))
    : OrganizationDb.insert(data, options).then(({id}) => find(OrganizationDb, {id})),
  // remove: (id, options) => OrganizationDb.remove(id, options),

})


const find = (OrganizationDb, query, options) => {
  options = options || {};

  return OrganizationDb.find(query, {limit: 1});
}
