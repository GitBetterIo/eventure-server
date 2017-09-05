// just to be 100%
process.env.NODE_ENV = 'test';
require('dotenv').config()

const config = require('../../config');

const domain = require('../../domain');
const infrastructure = require('../../infrastructure')(config, domain);
const application = require('../../application')(domain, infrastructure)

function truncateAll() {
  return infrastructure.Database.getTableNames().map(name => infrastructure.Database.db.raw(`TRUNCATE TABLE ${name} CASCADE`))
}

module.exports = {config, infrastructure, application, domain, truncateAll};
