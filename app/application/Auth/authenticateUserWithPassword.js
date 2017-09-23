
module.exports = ({userReadService, userRoot: User, errors}) => async (username, password) => {
  try {
    const userData = await userReadService.findUserByUsername(username);

    if (!userData)  throw new errors.AuthenticationError()

    const user = User(userData)

    if (!user.matchPassword(password)) throw new errors.AuthenticationError();
    
    return user;
  } catch(err) {
    const authErr = new errors.AuthenticationError(err.message);
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log(err.stack)
    // }
    throw authErr
  }
}

