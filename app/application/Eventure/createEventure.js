const uuid = require('uuid/v4')

module.exports = ({eventureRepository, eventureRoot}) => async data => {
  const id = uuid();
  const newEventure = eventureRoot.create(Object.assign({}, data, {id}));
  return await eventureRepository.save(newEventure);
}