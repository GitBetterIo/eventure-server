require('dotenv').config()


const config = require('./config');
const infrastructure = require('./infrastructure')(config);
const application = require('./application')(config, infrastructure)
const domain = { }


const httpServer = require('./http')(config, infrastructure, application, domain);

httpServer.start();
