

module.exports = ({config, application}) => {
  const passport = require('./passport')(application);
  const {authService} = application;

  return {
    authenticateLocal: passport.authenticate('local'),
    authenticateToken: passport.authenticate('bearer', {session: false}),

    login: function(req, res, next) {
      const token = authService.generateToken();
      authService.registerToken(token, req.user)
        .then(tokenData => res.json({token}))
        .catch(next)
    },

    logout: function(req, res, next) {
      authService.removeToken(req.token)
        .then(() => res.json({logout: 'ok'}) )
        .catch(next);
    },

  }

}
