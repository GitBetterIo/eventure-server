const router = require('express').Router();


module.exports = (config, application) => {
    const authRouter = require('./auth.router')(config, application);

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

    router.use('/auth', authRouter);

    return router;
}
