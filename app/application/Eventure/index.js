

module.exports = ({eventureRepository, eventureRoot}) => ({
  createEventure: require('./createEventure')({eventureRepository, eventureRoot}),
})