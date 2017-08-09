


module.exports = function(User, AccessToken, token) {
  const accessToken = AccessToken.find({token: token}, {limit: 1});
  const user = accessToken.then(accessToken => (accessToken)
    ? User.find({id: accessToken.userId}, {limit: 1})
    : null
  )

  return Promise.all([accessToken, user])
    .then((accessToken, user) => {
      if (user) {
        user.accessToken = accessToken;
      }
      return user;
    })

}
