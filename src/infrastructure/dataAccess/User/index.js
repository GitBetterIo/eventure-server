
const find = require('./find');
const insert = require('./insert');
const update = require('./update');
const remove = require('./remove');

const userTable = 'user_login';
const tokenTable = 'user_token';
const ctx = {userTable, tokenTable};

const getFirst = list => (list && list.length) ? list[0] : null;

module.exports = db => ({
  find: (query, options) => find(db, ctx, query, options),
  insert: (data, options) => insert(db, ctx, data, options),
  update: (data, options) => update(db, ctx, data, options),
  remove: (id, options) => insert(db, ctx, id, options),
})
