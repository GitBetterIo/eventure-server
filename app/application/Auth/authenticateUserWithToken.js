


module.exports = ({personReadService, errors}) => async (token) => {
  const person = await personReadService.findByToken(token);
  
  if (!person) throw new errors.AuthenticationError();

  return person;
}



