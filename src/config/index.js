process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  appName: 'Eventure API',
  port: process.env.PORT || 3030,
  env: process.env.NODE_ENV,

  db: require('./db'),
  session: require('./session'),
  email: require('./email'),
}
