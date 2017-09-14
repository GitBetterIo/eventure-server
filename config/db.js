const path = require('path');

function dbName(env) {
  switch (env) {
    case 'test':
      return process.env.DB_NAME_TEST;
    default:
      return process.env.DB_NAME;
  }
}

module.exports = env => ({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName(env),
    port: Number(process.env.DB_PORT),
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations',
    direcory: path.resolve(__dirname, '..', 'database', 'migrations'),
  },
  seeds: {
    direcory: path.resolve(__dirname, '..', 'database', 'seeds'),
  }
})
