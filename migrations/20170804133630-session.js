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
  db.createTable('session', {
    columns: {
      sid: {type: 'string', notNull: true},
      sess: {type: 'json', notNull: true},
      expire: {type: 'timestamp', notNull: true},
    }
  })
  return null;
};

exports.down = function(db) {
  db.dropTable('session');
  return null;
};

exports._meta = {
  "version": 1
};
