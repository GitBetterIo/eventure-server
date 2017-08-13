const Promise = require('bluebird');
const PgPromise = require('pg-promise');

module.exports = function(config) {
  const initOptions = {
    // global event notification;
    error: handleError,
    receive: (data, result, e) => { camelizeColumns(data); },
    extend: (obj, dc) => {


      obj.getTableNames = () => {
        const sql = `select *
          FROM information_schema.tables
          WHERE
            table_schema = 'public'
            AND table_name NOT IN ('migrations')`;
        return obj.any(sql).then(res => res.map(tbl => tbl.tableName))
      };

      obj.tables = {
        user: 'user_login',
        accessToken: 'user_token',
        organization: 'organization',
        eventure: 'eventure',
        listing: 'listing',
        listingGroup: 'listing_group',
      }
    },
    promiseLib: Promise,
  };



function camelizeColumns(data) {
    const tmp = data[0];
    for (let prop in tmp) {
        const camel = pgp.utils.camelize(prop);
        if (!(camel in tmp)) {
            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
}


function handleError(err, e) {
  if (e.cn) {
    // this is a connection-related error
    // cn = safe connection details passed into the library:
    //      if password is present, it is masked by #
  }

  if (e.query) {
    // query string is available
    console.error('(SQL)' + e.query);
    if (e.params) {
      // query parameters are available
    }
  }

  if (e.ctx) {
    // occurred inside a task or transaction
  }
}


  const pgp = PgPromise(initOptions);
  const db = pgp(config.db);
  return {db, pgp};
}
