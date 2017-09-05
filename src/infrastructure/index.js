// server/infrastructure/index.js

module.exports = (config, {Entities}) => {
  const Database = require('./database')(config);
  const Repositories = require('./repositories')({Database, Entities})
  const services = require('./services')({config, Database, Entities});
  const errors = require('./errors');


  return Object.assign(
    { Database, Repositories, errors },
    services
  );
};
