// just to be 100%
process.env.NODE_ENV = 'test';
require('dotenv').config()

const config = require('../../config');

const infrastructure = require('../../infrastructure')(config);
const application = require('../../application')(config, infrastructure)
const domain = { }

function truncateAll() {
  return infrastructure.db.getTableNames().each(name => {
    const sql = `TRUNCATE TABLE ${name} CASCADE`;
    return infrastructure.db.query(sql);
  })
}

module.exports = {config, infrastructure, application, domain, truncateAll};
