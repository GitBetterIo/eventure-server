// server.js
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const chalk = require('chalk');
const session = require('express-session');
const pgSession = require('connect-pg-simple');
const passport = require('passport');
const cors = require('cors');


module.exports = (container) => {
  const {dbService, config} = container.cradle;
  const app = express();

  app.use((req, res, next) => {
    req.container = container.createScope()
    next();
  })

  const router = require('./routes')(container);
  // const apiRouter = require('./routes/api')(application, infrastructure, domain);
  // const authRouter = require('./routes/auth')(authService);
  const errorHandler = require('./routes/errorHandler')

  app.use(cors());
  app.use(expressStatusMonitor());
  // app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());

  // app.use(session({
  //   store: new (pgSession(session))({conObject : config.db}),
  //   secret: config.session.secret,
  //   resave: config.session.resave,
  //   saveUninitialized: config.session.saveUninitialized,
  //   cookie: config.session.cookie,
  // }));
  app.use(passport.initialize());
  // app.use(passport.session());

  app.get('/info/ping', function(req, res, next) {
    res.json({pong: 1});
  });

  app.use('/api/v1', router);
  app.use(errorHandler);


  app.start = function() {
    app.listen(config.port, () => {
      console.log(`${chalk.green('✓')} App ${config.appName} is listening on port ${config.port} in mode ${config.env}`);
    });
  }

  return app

}
