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
  db.createTable('user_token', {
    token: {type: 'uuid', primaryKey: true},
    user_id: {type: 'bigint', notNull: true},
  })
  return null;
};

exports.down = function(db) {
  db.dropTable('user_token');
  return null;
};

exports._meta = {
  "version": 1
};
