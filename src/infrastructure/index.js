// server/infrastructure/index.js

module.exports = (config, {Entities}) => {
  const Database = require('./database')(config);
  const Repositories = require('./repositories')({Database, Entities})
  const Services = require('./services')({config, Database, Entities});
  const errors = require('./errors');


  // TODO: move all services to Services
  return Object.assign(
    { Database, Repositories, Services, errors },
    services
  );
};
