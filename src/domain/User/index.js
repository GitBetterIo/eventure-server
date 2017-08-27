
const passwordFunctions = require('./password');

module.exports = Object.assign({
  createProfile: require('./createProfile'),
  createLogin: require('./createLogin'),
  login: require('./login'),
  tokens: require('./tokenCollection'),
},
  passwordFunctions
)
