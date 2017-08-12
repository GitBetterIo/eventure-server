

module.exports = db => ({
  UserDb: require('./User')(db),
  AccessTokenDb: require('./AccessToken')(db),
})
