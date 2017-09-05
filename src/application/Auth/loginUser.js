
module.exports = ({authService, User, userRepository}) => async (user) => {
  const accessToken = await authService.createAccessToken(user.id);
  const updateUser = await userRepository.save(User.login(user));
  return accessToken;
}

