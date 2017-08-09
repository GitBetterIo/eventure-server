'use strict';
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

exports.up = function(db, callback) {
  const salt = bcrypt.genSaltSync(10);

  const sql = `INSERT INTO user_login (username, password_hash, email, first_name, last_name) VALUES
    ('aaron', '${bcrypt.hashSync('aaron_pass', salt)}', 'aaron@topshelfrobot.com', 'Aaron', 'Johnson')`;

  db.runSql(sql, callback)
  return null;
};

exports.down = function(db, callback) {
  const sql = `DELETE FROM user_login WHERE username = 'aaron'`;
  db.runSql(sql, callback)
  return null;
};

exports._meta = {
  "version": 1
};
