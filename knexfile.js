// Update with your config settings.
require('dotenv').config();
const dbConfig = require('./config/db');


module.exports = {
  development: dbConfig('development'),
  production: dbConfig('production'),
  test: dbConfig('test'),
};
