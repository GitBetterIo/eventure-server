

module.exports = user => Object.assign({}, user, {lastLogin: new Date()});
