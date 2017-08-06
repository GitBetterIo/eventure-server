const router = require('express').Router();


module.exports = (config, application) => {
  const auth = require('./handlers/auth.handler')({config, application});
  const user = require('./handlers/user.handler')({config, application});

  /**
   * Extract the Bearer token (if any) from the Authorization header
   */
  router.use(function(req, res, next) {
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        req.token = parts[1];
      }
    }
    next();
  })

  router.post('/auth/login', auth.authenticateLocal, auth.login);
  router.use(auth.authenticateToken);
  router.use('/auth/logout', auth.logout);


  router.use('/me', user.me);

  return router;
}
