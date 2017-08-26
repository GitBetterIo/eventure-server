'use strict';
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

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
  const userId = uuid();
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('aaron_pass', salt);
  const now = (new Date()).toISOString();

  const sql_profile = `INSERT INTO user_profile (id, email, first_name, last_name, created, modified) VALUES
    ('${userId}', 'aaron@topshelfrobot.com', 'Aaron', 'Johnson', '${now}', '${now}')`;
  const sql_login = `INSERT INTO user_login (id, username, password_hash, created, modified) VALUES
    ('${userId}', 'aaron', '${passwordHash}', '${now}', '${now}')`;

  return db.runSql(sql_profile)
    .then(() => db.runSql(sql_login))
};

exports.down = function(db) {
  const sql = `DELETE FROM user_profile WHERE email = 'aaron@topshelfrobot.com'`;
  db.runSql(sql)
  return null;
};

exports._meta = {
  "version": 1
};
