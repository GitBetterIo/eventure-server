const uuid = require('uuid/v4');


module.exports = ({AccessTokenDb}) => ({
  findToken: token => AccessTokenDb.find({token}, {limit: 1}),
  saveToken: (token, userId) => AccessTokenDb.insert({token, userId}),
  removeToken: (token) => AccessTokenDb.remove({token}),
  generateToken: () => uuid(),
})
