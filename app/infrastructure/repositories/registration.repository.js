
module.exports = ({registrationDataStore, registrationRoot: Registration}) => ({
  get: (id, options) => get(registrationDataStore, Registration, id),
  save: (data, options) => save(registrationDataStore, Registration, data, options),
  remove: (id, options) => remove(registrationDataStore, id, options),
})



const get = async (registrationDataStore, Registration, id) => {
  const regData = await registrationDataStore.findOne({id});
  if (!regData) throw new Error(`Unknown Registration '${id}'`);

  const org = Registration(regData);
  return org;
}

const save = (registrationDataStore, Registration, regData, options) => {
  return registrationDataStore.save(regData);
}



const remove = (registrationDataStore, id, options={}) => {

  return (options.purge)
    ? registrationDataStore.purge({id})
    : registrationDataStore.remove({id})
}