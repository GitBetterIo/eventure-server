
module.exports = ({tokenService}) => async (user, token) => {
  return tokenService.removeAccessToken(token);
}

