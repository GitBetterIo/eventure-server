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


module.exports = (config, infrastructure, application, domain) => {

  const app = express();
  const {authService} = application;
  const {db} = infrastructure;

  const router = require('./routes')(config, application);
  // const apiRouter = require('./routes/api')(application, infrastructure, domain);
  // const authRouter = require('./routes/auth')(authService);
  const errorHandler = require('./routes/errorHandler')(application, infrastructure, domain);

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
    return db.connect()
      .then(obj => {
          obj.done(); // success, release the connection;
          console.log(`${chalk.green('✓')} Db Connection successful`);
          app.listen(config.port, () => {
            console.log(`${chalk.green('✓')} App ${config.appName} is listening on port ${config.port} in mode ${config.env}`);
          });
      })
      .catch(error => {
          console.log('ERROR:', error);
      });

  }

  return app

}
