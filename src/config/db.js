
function dbName(env) {
  switch (env) {
    case 'test':
      return process.env.DB_NAME_TEST;
    default:
      return process.env.DB_NAME;
  }
}

module.exports = {
  database: dbName(process.env.NODE_ENV),
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
}
