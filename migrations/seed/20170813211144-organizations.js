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

exports.up = function(db, callback) {
  const d = (new Date()).toISOString();
  const sql = `INSERT INTO organization (name, created, modified) VALUES
    ('We Run Races', '${d}', '${d}'),
    ('So Many Races', '${d}', '${d}'),
    ('Run, Damnit, Run', '${d}', '${d}') `;

  db.runSql(sql, callback)
  return null;
};

exports.down = function(db, callback) {
  const sql = `DELETE FROM organization WHERE name IN ('We Run Races', 'So Many Races', 'Run, Damnit, Run')`;
  db.runSql(sql, callback)
  return null;
};

exports._meta = {
  "version": 1
};
