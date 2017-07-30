// server/infrastructure/index.js

module.exports = config => {
  const {db, pgp} = require('./db')(config);

  return {db, pgp}
};
