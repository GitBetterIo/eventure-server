const omit = require('lodash/omit');
const {setPassword} = require('./password');

module.exports = (user, loginData) => {
  if (!user || !user.id) {
    throw new Error('Expeced a user object with, at least, an id');
  }

  if (!loginData.username) {
    throw new Error('Expected a username');
  }


  const login = Object.assign({}, omit(loginData, ['password']), {id: user.id} );
  const userWithLogin = Object.assign({}, user, {login});

  return (loginData.password) 
    ? setPassword(userWithLogin, loginData.password)
    : userWithLogin;
}
