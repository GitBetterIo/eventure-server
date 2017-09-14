process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config()

module.exports = {
  appName: 'Eventure API',
  port: process.env.PORT || 3030,
  env: process.env.NODE_ENV,

  db: require('./db')(process.env.NODE_ENV),
  session: require('./session'),
  email: require('./email'),
}
