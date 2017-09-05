
const passwordFunctions = require('./password');
const getterFunctions = require('./getters');

module.exports = Object.assign({
  create: require('./create'),
  createLogin: require('./createLogin'),
  login: require('./login'),
},
  passwordFunctions,
  getterFunctions,
)
