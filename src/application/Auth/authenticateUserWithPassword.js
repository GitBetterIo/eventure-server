
module.exports = ({authService, User, errors}) => async (username, password) => {
  try {
    const user = await authService.findUserByUsername(username);
    if (!user || !User.matchPassword(user, password)) throw new errors.AuthenticationError();
    return user;
  } catch(err) {
    throw new errors.AuthenticationError(err);
  }
}

