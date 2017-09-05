
module.exports = (Database, User) => ({
  get: (id, options) => get(Database, User, id),
  save: (data, options) => save(Database, User, data, options),
  remove: (id, options) => remove(Database, User, id, options),
})



const get = (Database, User, id) => {
  return Promise.all([
    Database.userProfile.find({id}, {limit: 1}),
    Database.userLogin.find({id}, {limit: 1}),
  ])
    .then(([profile, login]) => {
      const user = User.create(profile);
      const userWithLogin = User.createLogin(user, login);
      return userWithLogin;
    })
}

const save = (Database, User, userData, options) => {
  const profile = User.getProfile(userData);
  const login = User.getLogin(userData);
  const id = User.getId(userData);


  return Database.userProfile.save(profile)
    .then(() => Database.userLogin.save(login));
}



const remove = (Database, User, userId, options={}) => {

  return (options.purge)
    ? Promise.all([
      Database.userProfile.purge({id: userId}),
      Database.userLogin.purge({id: userId}),
    ])
    : Promise.all([
      Database.userProfile.remove({id: userId}),
      Database.userLogin.remove({id: userId}),
    ])
}