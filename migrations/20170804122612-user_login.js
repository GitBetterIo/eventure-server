'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('user_login', {
    columns: {
      id: {type: 'bigint', primaryKey: true, autoIncrement: true},
      username: {type: 'string', length: 255, notNull: true},
      password_hash: {type: 'string', length: 500, notNull: true},
      password_reset_token: {type: 'string', length: 500},

      email: {type: 'string'},
      first_name: {type: 'string'},
      last_name: {type: 'string'},
      created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
      modified: {type: 'timestamp'},
      last_login: {type: 'datetime'}
    }
  })
  return null;
};

exports.down = function(db) {
  db.dropTable('user_login');
  return null;
};

exports._meta = {
  "version": 1
};
