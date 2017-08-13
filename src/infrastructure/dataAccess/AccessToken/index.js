
const find = require('./find');
const insert = require('./insert');
const remove = require('./remove');


module.exports = db => ({
  find: (query, options) => find(db, query, options),
  insert: (data, options) => insert(db, data, options),
  remove: (token, options) => remove(db, token, options),
})
