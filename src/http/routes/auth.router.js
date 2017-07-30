const router = require('express').Router();


module.exports = (config, application) => {
  // const passport = application.authService.passport;
  const userService = application.userService;

  const passport = require('./passport')(userService);

  router.post('/login',
    function(req, res, next) {
      console.log("IN LOGIN ROUTE");
      next();
    },
    passport.authenticate('local'),
    function(req, res, next) {
      res.json({user: req.user});
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
