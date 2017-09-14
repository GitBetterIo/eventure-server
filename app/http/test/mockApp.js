// just to be 100%
process.env.NODE_ENV = 'test';
const config = require('../../../config');
const container = require('../../container')({config})
const {dbService} = container.cradle

function truncateAll() {
  return dbService.getTableNames().map(name => dbService.raw(`TRUNCATE TABLE ${name} CASCADE`))
}

module.exports = {container, truncateAll};
