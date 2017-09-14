

module.exports = ({
  authenticateLocal: (req, res, next) => req.container.cradle.passport.authenticate('local')(req, res, next),
  authenticateToken: (req, res, next) => req.container.cradle.passport.authenticate('bearer', {session: false})(req, res, next),

  login: async function(req, res, next) {
    const {authService} = req.container.cradle

    try {
      const accessToken = await authService.loginUser(req.user);
      return res.json(accessToken);
    } catch(err) {
      return next(err);
    }
  },

  logout: async function(req, res, next) {
    const {authService} = req.container.cradle

    try {
      await authService.logoutUser(req.user, req.token);
      return res.json({logout: true});
    } catch(err) {
      return next(err);
    }
  },

})
