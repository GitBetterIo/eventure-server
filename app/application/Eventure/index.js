

module.exports = ({eventureRepository, eventureRoot}) => ({
  createEventure: require('./createEventure')({eventureRepository, eventureRoot}),

  addListingToEventure: require('./addListingToEventure')({eventureRepository, eventureRoot}),
})