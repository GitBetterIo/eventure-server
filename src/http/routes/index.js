const router = require('express').Router();


module.exports = (config, application) => {
    const authRouter = require('./auth.router')(config, application);

    router.use('/auth', authRouter);

    return router;
}
