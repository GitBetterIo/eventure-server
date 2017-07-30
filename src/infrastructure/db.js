const Promise = require('bluebird');
const PgPromise = require('pg-promise');

module.exports = function(config) {
  const initOptions = {
    // global event notification;
    error: (error, e) => {
      if (e.cn) {
        // A connection-related error;
        //
        // Connections are reported back with the password hashed,
        // for safe errors logging, without exposing passwords.
        console.log('CN:', e.cn);
        console.log('EVENT:', error.message || error);
      }
    },
    promiseLib: Promise,
  };

  const pgp = PgPromise(initOptions);
  const db = pgp(config.db);
  return {db, pgp};
}
