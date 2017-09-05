const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');


module.exports = ({Database, User}) => ({
  findUserByUsername: username => findUserByUsername(Database, User, username),
  findUserByToken: token => findUserByToken(Database, User, token),
  findLoginById: id => findLoginById(Database, id),
  findAccessToken: token => findAccessToken(Database, token),

  createAccessToken: userId => createAccessToken(Database, userId),
  removeAccessToken: token => removeAccessToken(Database, token),

  generateToken: generateToken,
})


const findUserByUsername = async (Database, User, username) => {
  const login = await Database.userLogin.findOne({username});
  if (!login) return null;

  const profile = await Database.userProfile.findOne({id: login.id});
  const user = User.create(profile);
  const userWithLogin = User.createLogin(user, login);
  return userWithLogin;
}

const findUserByToken = async (Database, User, token) => {
  const accessToken = await Database.accessToken.findOne({token});
  if (!accessToken) return null;

  const id = accessToken.userId;
  const profile = await Database.userProfile.findOne({id});
  const login = await Database.userLogin.findOne({id});
  const user = User.create(profile);
  const userWithLogin = User.createLogin(user, login);
  return userWithLogin
}

const findLoginByUsername = (Database, username) => Database.userLogin.findOne({username});
const findLoginById = (Database, id) => Database.userLogin.findOne({id});
const findAccessToken = (Database, token) => Database.accessToken.findOne({token});



const setLastLogin = (Database, userId) => {
  const userData = {
    id: userId,
    lastLogin: new Date(),
  }
  return Database.userLogin.save(userData);
}

const createAccessToken = (Database, userId) => {
  const token = generateToken();
  const tokenData = { token, userId };
  return Database.accessToken.save(tokenData);
}

const removeAccessToken = (Database, token) => {
  return Database.accessToken.remove({token});
}

/**
 * Generate a token
 */
const generateToken = () => uuid();




