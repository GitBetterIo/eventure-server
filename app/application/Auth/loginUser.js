
module.exports = ({tokenService, userRepository, userEntity: User}) => async (user) => {
  const accessToken = await tokenService.createAccessToken(user.id);
  const updateUser = await userRepository.save(User.login(user));
  
  return accessToken;
}

