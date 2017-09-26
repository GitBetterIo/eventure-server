
module.exports = ({tokenService, personRepository}) => async (user) => {
  const accessToken = await tokenService.createAccessToken(user.id);
  const updateUser = await personRepository.save(user.loginUser());
  
  return accessToken;
}

