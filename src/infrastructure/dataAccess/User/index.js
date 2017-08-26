
const find = require('./find');
const insertProfile = require('./insertProfile');
const insertLogin = require('./insertLogin');
const updateProfile = require('./updateProfile');
const updateLogin = require('./updateLogin');
const removeLogin = require('./removeLogin');
const removeProfile = require('./removeProfile');


module.exports = db => ({
  find: (query, options) => find(db, query, options),
  profile: {
    insert: (data, options) => insertProfile(db, data, options),
    update: (data, options) => updateProfile(db, data, options),
    remove: (id, options) => removeProfile(db, id, options),
  },
  login: {
    insert: (data, options) => insertLogin(db, data, options),
    update: (data, options) => updateLogin(db, data, options),
    remove: (id, options) => removeLogin(db, id, options),
  },
})
