

module.exports = ({config, application}) => {
  const {authService} = application;

  const passport = require('./passport')({authService});

  return {
    authenticateLocal: passport.authenticate('local'),
    authenticateToken: passport.authenticate('bearer', {session: false}),

    login: async function(req, res, next) {
      try {
        const accessToken = await authService.loginUser(req.user);
        return res.json(accessToken);
      } catch(err) {
        return next(err);
      }
    },

    logout: async function(req, res, next) {

      try {
        await authService.logoutUser(req.user, req.token);
        return res.json({logout: true});
      } catch(err) {
        return next(err);
      }
    },

  }

}
