
const find = require('./find');
const insert = require('./insert');
const remove = require('./remove');

const tokenTable = 'user_token';
const ctx = {tokenTable};


module.exports = db => ({
  find: (query, options) => find(db, ctx, query, options),
  insert: (data, options) => insert(db, ctx, data, options),
  remove: (token, options) => remove(db, ctx, token, options),
})
