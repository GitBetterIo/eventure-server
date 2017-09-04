
module.exports = ({UserDb}) => ({
  find: (query, options) => find(UserDb, query, {limit: 1}),
  list: (query, options) => find(UserDb, query, options || {}),
  save: (data, options) => save(UserDb, data, options),
  remove: (id, options) => remove(UserDb, id, options),
  purge: (id, options) => purge(UserDb, id, options),

  // not really repository pattern, but not a terrible place to put these
  findByUsername: username => this.find({username}, {limit:1}),
  findByToken: token => this.find({token}, {limit: 1}),
})


const hydrateUser = raw => Object.keys(raw).reduce( (user, key) => {
    const parts = key.split('$');
    if (parts[0]==='login') user.login[parts[1]] = raw[key];
    else user[parts[1] || parts[0]] = raw[key];
    return user;
  }, {login:{}});

const find = (UserDb, query, options) => {
  return UserDb.find(query, options)
    .then(raw => Array.isArray(raw)
      ? raw.map(hydrateUser)
      : hydrateUser(raw)
    );
}

const save = (UserDb, data, options) => {
  // TODO: !!!This should be in a transaction

  // You can't delete user data using this method;
  data.deleted = undefined;
  if (data.login) data.login.deleted = undefined;

  let loginOperation;
  const profileOperation = (data._new) ? UserDb.profile.insert : UserDb.profile.update;

  if (!data.login) loginOperation = () => {}; // noop
  else loginOperation =  (data.login._new) ? UserDb.login.insert : UserDb.login.update

  return Promise.all([
    profileOperation(data, options),
    loginOperation(data.login, options),
  ])
    .then(([profile, login]) => find(UserDb, {id: profile.id}, {limit: 1}) )
}

const remove = (UserDb, id, options) => {
  // TODO: !!!This should be in a transaction
  return Promise.all([
    UserDb.profile.remove(id),
    UserDb.login.remove(id),
  ])
}

const purge = (UserDb, id, options) => {
  return Promise.all([
    UserDb.profile.purge(id),
    UserDb.login.purge(id),
  ])

}
