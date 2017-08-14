

module.exports = ({config, application}) => {
  const {authService} = application;

  const passport = require('./passport')({authService});

  return {
    authenticateLocal: passport.authenticate('local'),
    authenticateToken: passport.authenticate('bearer', {session: false}),

    login: function(req, res, next) {

      const {SUCCESS, ERROR} = authService.loginUser.outputs;
      authService.loginUser(req.user)
        .on(SUCCESS, accessToken => res.json(accessToken))
        .on(ERROR, err => next(err))
        .execute();
    },

    logout: function(req, res, next) {
      const {SUCCESS, ERROR} = authService.logoutUser.outputs;
      authService.logoutUser(req.user, req.token)
        .on(SUCCESS, () => res.json({logout: true}))
        .on(ERROR, err => next(err))
        .execute();
    },

  }

}
