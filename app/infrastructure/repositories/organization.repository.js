
module.exports = ({organizationDataStore, organizationEntity: Organization}) => ({
  get: (id, options) => get(organizationDataStore, Organization, id),
  save: (data, options) => save(organizationDataStore, Organization, data, options),
  remove: (id, options) => remove(organizationDataStore, id, options),
})



const get = async (organizationDataStore, Organization, id) => {
  const orgData = await organizationDataStore.findOne({id});
  if (!orgData) throw new Error(`Unknown organization '${id}'`);

  const org = Organization.create(orgData);
  return org;
}

const save = (organizationDataStore, Organization, orgData, options) => {
  return organizationDataStore.save(orgData);
}



const remove = (organizationDataStore, id, options={}) => {

  return (options.purge)
    ? organizationDataStore.purge({id})
    : organizationDataStore.remove({id})
}