


module.exports = ({eventure, eventureRepository}) => {

  return {
    createEventure(eventureData) {
      const evt = eventure.create(eventureData);

      return eventureRepository.save(evt);
      // Do some logging here
    },
  }
}
