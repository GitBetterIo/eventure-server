
module.exports = (Database, Organization) => ({
  get: (id, options) => get(Database, Organization, id),
  save: (data, options) => save(Database, Organization, data, options),
  remove: (id, options) => remove(Database, id, options),
})



const get = async (Database, Organization, id) => {
  const orgData = await Database.organization.findOne({id});
  if (!orgData) throw new Error(`Unknown organization '${id}'`);

  const org = Organization.create(orgData);
  return org;
}

const save = (Database, Organization, orgData, options) => {
  return Database.organization.save(orgData);
}



const remove = (Database, id, options={}) => {

  return (options.purge)
    ? Database.organization.purge({id})
    : Database.organization.remove({id})
}