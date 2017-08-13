
const find = require('./find');
const insert = require('./insert');
const update = require('./update');
const remove = require('./remove');


module.exports = db => ({
  find: (query, options) => find(db, query, options),
  insert: (data, options) => insert(db, data, options),
  update: (data, options) => update(db, data, options),
  remove: (id, options) => insert(db, id, options),
})
