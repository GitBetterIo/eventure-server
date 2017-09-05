

module.exports = config => {
  const db = require('./db')(config);

  return {
    db,
    getTableNames: require('./getTableNames')(db),
    userProfile: require('./userProfile')(db),
    userLogin: require('./userLogin')(db),
    accessToken: require('./accessToken')(db),
  }
}


