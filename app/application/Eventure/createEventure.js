
module.exports = ({eventureRepository, eventureRoot, idService}) => async (organizationId, eventureData) => {
  const id = idService.createId()
  const newEventure = eventureRoot(Object.assign({}, eventureData, {id, organizationId}));
  return await eventureRepository.save(organizationId, newEventure);
}