const router = require('express').Router();


module.exports = (config, application) => {
  const passport = require('./passport')(application);
  const {authService} = application;

  router.post('/login',
    passport.authenticate('local'),
    function(req, res, next) {

      const token = authService.generateToken();
      authService.registerToken(token, req.user)
        .then(tokenData => res.json({token}))
        .catch(next)
    }
  );

  router.post('/logout', function(req, res, next) {
    req.logout();
    res.json({logout: 'ok'});
  });



  router.get('/me', function(req, res, next) {
    res.json(req.user);
  });

  return router;
}
