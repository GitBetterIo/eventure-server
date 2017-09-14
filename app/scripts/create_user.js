const config = require('../config');
const infrastructure = require('./infrastructure')(config);
const application = require('./application')(config, infrastructure)

const {userService} = application;

const [username, password] = process.argv.slice(2);

userService.createUser({username, password})
  .then(res => {
    console.log("Created user", res);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
