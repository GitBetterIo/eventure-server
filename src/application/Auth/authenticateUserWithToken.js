


module.exports = ({authService, errors}) => async (token) => {
  const user = await authService.findUserByToken(token);
  if (!user) throw new errors.AuthenticationFail();
  return user;
}



