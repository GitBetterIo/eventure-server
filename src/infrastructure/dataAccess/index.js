

module.exports = db => ({
  UserDb: require('./User')(db),
  AccessTokenDb: require('./AccessToken')(db),
  OrganizationDb: require('./Organization')(db),
  EventureDb: require('./Eventure')(db),
  ListingDb: require('./Listing')(db),
  ListingGroupDb: require('./ListingGroup')(db),
})
