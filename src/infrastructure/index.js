// server/infrastructure/index.js

module.exports = (config, {Entities}) => {
  const db = require('./db')(config);
  const Database = require('./dataAccess')(db);
  const Repositories = require('./repositories')({Database, Entities})
  const services = require('./services')({config, Database});


  return Object.assign(
    { db, Database },
    services
  );
};
