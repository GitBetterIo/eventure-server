


module.exports = ({authService, errors}) => (token) => {
  return authService.findUserByToken(token)
    .then(user => {
      if (!user) throw new errors.AuthenticationFail();
      return user;
    })
}



