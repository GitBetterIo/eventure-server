
const passwordFunctions = require('./password');

module.exports = Object.assign({
  login: require('./login'),
  tokens: require('./tokenCollection'),
},
  passwordFunctions
)
