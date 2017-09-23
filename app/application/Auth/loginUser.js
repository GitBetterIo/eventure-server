
module.exports = ({tokenService, userRepository}) => async (user) => {
  const accessToken = await tokenService.createAccessToken(user.id);
  const updateUser = await userRepository.save(user.loginUser());
  
  return accessToken;
}

