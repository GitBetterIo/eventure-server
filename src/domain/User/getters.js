const omit = require('lodash/omit');
const pick = require('lodash/pick');

module.exports = {
  getProfile: user => omit(user, ['login']),
  getLogin: user => (user.login) ? Object.assign({}, user.login) : null,
  getId: user => user.id,
}