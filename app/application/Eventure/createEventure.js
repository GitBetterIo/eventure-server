const uuid = require('uuid/v4')

module.exports = ({eventureRepository, eventureRoot}) => async (organizationId, eventureData) => {
  const id = uuid();
  const newEventure = eventureRoot(Object.assign({}, eventureData, {id, organizationId}));
  return await eventureRepository.save(organizationId, newEventure);
}