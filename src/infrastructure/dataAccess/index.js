

module.exports = db => ({
  User: require('./User')(db),
  AccessToken: require('./AccessToken')(db),
})
