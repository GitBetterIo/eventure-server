module.exports = config => {
  // Inspired by
  // https://github.com/talyssonoc/node-api-boilerplate
  //
  const container = require('./container')(config);
  
  // const domain = require('./domain');
  // const infrastructure = require('./infrastructure')(config, domain);
  // const application = require('./application')(domain, infrastructure)
  
  
  // const httpServer = require('./http')(container);
  
  // httpServer.start();

}

