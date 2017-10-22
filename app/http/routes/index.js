const router = require('express').Router();


module.exports = (container) => {
  const auth = require('./handlers/auth.handler');
  const org = require('./handlers/org.handler');
  const eventure = require('./handlers/eventure');
  const registration = require('./handlers/registration.handler');
  const people = require('./handlers/people.handler');



  /**
   * Determine the organization id
   */
  router.use(function(req, res, next) {
    // DEVELOPMENT ONLY
    const organizationId = req.headers.organization || req.body.organization || 'd3b86b88-e3e3-4783-b41b-11f43c23ab27';

    if (!organizationId) {
      const err = new Error('Request was not made to a specific organization');
      err.status = 400;
      return next(err);
    }

    req.organization = {id: organizationId}
    next();
  })


  router.post('/login', auth.authenticateLocal, auth.login);
  // router.post('/registration/start', registration.startRegistration);

  router.use(auth.authenticateToken);
  router.use((req, res, next) => {
    req.container.registerValue({
      currentUser: req.user,
      currentOrganization: req.organization
    })
    next();
  })

  /**
   * Access Control
   */
  // TODO

  router.use('/logout', auth.logout);
  
  router.get('/organization', org.list);
  router.post('/organization', org.create);
  router.get('/organization/:orgId', org.get);
  router.put('/organization/:orgId', org.update);
  router.delete('/organization/:orgId', org.remove);
  
  router.get('/eventure', eventure.list);
  router.post('/eventure', eventure.create);
  router.get('/eventure/:eventureId', eventure.get);
  
  router.post('/eventure/:eventureId/listing', eventure.addListing);

  router.put('/eventure/:eventureId/listing/:listingId/feeSchedule', eventure.updateFeeSchedule)
  
  router.use('/me', people.me);
  router.get('/person', people.list)
  router.put('/person/:personId', people.update)

  return router;s
}
