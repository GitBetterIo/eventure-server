const uuid = require('uuid/v4');

const generateToken = () => uuid();

module.exports = ({accessTokenDataStore, userRoot:User}) => ({
  createAccessToken(userId) {
    const token = generateToken();
    const tokenData = { token, userId };

    return accessTokenDataStore.save(tokenData);
  },

  removeAccessToken(token) {
    return accessTokenDataStore.remove({token});
  },

  generateToken: generateToken,
})







