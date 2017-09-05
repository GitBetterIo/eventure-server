
module.exports = ({authService}) => (user, token) => {

  return authService.removeAccessToken(token);
}

