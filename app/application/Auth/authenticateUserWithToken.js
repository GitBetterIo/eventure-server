


module.exports = ({userReadService, errors}) => async (token) => {
  const user = await userReadService.findUserByToken(token);
  
  if (!user) throw new errors.AuthenticationError();

  return user;
}



