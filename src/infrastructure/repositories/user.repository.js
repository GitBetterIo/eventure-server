
module.exports = ({UserDb}) => ({
  find: (query, options) => {
    options = options || {};

    return UserDb.find(query, {limit: 1});
  },

  list: (query, options) => UserDb.find(query, options),
  save: (data, options) => (data.id) ? UserDb.update(data, options) : UserDb.insert(data, options),
  remove: (id, options) => UserDb.remove(id, options),

  // not really repository pattern, but not a terrible place to put these
  findByUsername: username => this.find({username}, {limit:1}),
  findByToken: token => this.find({token}, {limit: 1}),
})
