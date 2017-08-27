const router = require('express').Router();


module.exports = (application, infrastructure) => {
  const auth = require('./handlers/auth.handler')({application, infrastructure});
  const user = require('./handlers/user.handler')({application, infrastructure});
  const org = require('./handlers/org.handler')({application, infrastructure});
  const registration = require('./handlers/registration.handler')({application});

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
  router.post('/registration/start', registration.startRegistration);

  router.get('/organization', org.list);
  router.post('/organization', org.create);
  router.get('/organization/:orgId', org.get);
  router.put('/organization/:orgId', org.update);
  router.delete('/organization/:orgId', org.remove);
  return router;
}
