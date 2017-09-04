require('dotenv').config()


// Inspired by
// https://github.com/talyssonoc/node-api-boilerplate
//
const config = require('./config');
const domain = require('./domain');
const infrastructure = require('./infrastructure')(config, domain);
const application = require('./application')(domain, infrastructure)


const httpServer = require('./http')(config, infrastructure, application, domain);

httpServer.start();
