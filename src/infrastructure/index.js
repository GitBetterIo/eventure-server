// server/infrastructure/index.js

module.exports = config => {
  const {db, pgp} = require('./db')(config);
  const dataAccess = require('./dataAccess')(db);
  const repositories = require('./repositories')(dataAccess)
  const services = require('./services')({dataAccess});

  return Object.assign(
    { db, pgp, dataAccess },
    repositories,
    services
  );
};
