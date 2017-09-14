module.exports = ({
    userLoginDataStore,
    userProfileDataStore,
    accessTokenDataStore,
    userEntity: User
  }) => ({
  async findUserByUsername(username)  {
    const login = await userLoginDataStore.findOne({username});
    if (!login) return null;
  
    const profile = await userProfileDataStore.findOne({id: login.id});
    const user = User.create(profile);
    const userWithLogin = User.createLogin(user, login);

    return userWithLogin;
  },
  
  async findUserByToken(token) {
    const accessToken = await accessTokenDataStore.findOne({token});
    if (!accessToken) return null;
  
    const id = accessToken.userId;
    const profile = await userProfileDataStore.findOne({id});
    const login = await userLoginDataStore.findOne({id});
    const user = User.create(profile);
    const userWithLogin = User.createLogin(user, login);

    return userWithLogin
  },
  
  findLoginByUsername: async (username) => userLoginDataStore.findOne({username}),
  findLoginById: async (id) => userLoginDataStore.findOne({id}),
  findAccessToken: async (token) => accessTokenDataStore.findOne({token}),
  
})