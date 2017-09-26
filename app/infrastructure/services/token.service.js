const uuid = require('uuid/v4');

const generateToken = () => uuid();

module.exports = ({accessTokenDataStore}) => ({
  createAccessToken(personId) {
    const token = generateToken();
    const tokenData = { token, personId };

    return accessTokenDataStore.save(tokenData);
  },

  removeAccessToken(token) {
    return accessTokenDataStore.remove({token});
  },

  generateToken: generateToken,
})







