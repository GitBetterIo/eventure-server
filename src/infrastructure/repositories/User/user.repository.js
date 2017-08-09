const findUserByToken = require('./findUserByToken');

module.exports = ({User, AccessToken}) => ({
  get: (query, options) => {
    options = options || {};
    if (query.token) return findUserByToken(User, AccessToken, query.token)

    const singleRecordOpts = Object.assign({}, options, {limit: 1});
    return User.find(query, singleRecordOpts);
  },

  list: (query, options) => User.find(query, options),

  save: (data, options) => {
    return (data.id)
      ? User.update(data, options)
      : User.insert(data, options);
  },

  remove: (id, options) => User.remove(id, options),
})
