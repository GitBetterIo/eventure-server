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

  Promise.all([
    db.createTable('user_profile', {
      columns: {
        id: {type: 'UUID', primaryKey: true},
        email: {type: 'string', notNull: true},
        first_name: {type: 'string'},
        last_name: {type: 'string'},
        created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
        modified: {type: 'timestamp'},
        deleted: {type: 'boolean', defaultValue: false},
      }
    }),

    db.createTable('user_login', {
      columns: {
        id: {type: 'UUID', primaryKey: true},
        username: {type: 'string', length: 255, notNull: true},
        password_hash: {type: 'string', length: 500, notNull: true},

        password_reset_token: {type: 'UUID'},
        registration_token: {type: 'UUID'},
        registration_expire: {type: 'timestamp'},

        last_login: {type: 'timestamp'},
        created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
        modified: {type: 'timestamp'},
        deleted: {type: 'boolean', defaultValue: false},
      }
    })
  ]).then(() => {

    db.addForeignKey('user_login', 'user_profile', 'user_login_user_profile_foreign',
    { 'id': 'id' },
    {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });

  })



  return null;
};

exports.down = function(db) {
  db.dropTable('user_login');
  db.dropTable('user_profile');
  return null;
};

exports._meta = {
  "version": 1
};
