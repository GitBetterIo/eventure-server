module.exports = config => {
  // Inspired by
  // https://github.com/talyssonoc/node-api-boilerplate
  //
  const container = require('./container')({config});
  const httpServer = require('./http')(container);
  
  httpServer.start();
}

