
module.exports = ({ userLoginDataStore, userProfileDataStore, userEntity: User}) => ({

  get: async (id) => {
    const profile = await userProfileDataStore.findOne({id})
    const login = await userLoginDataStore.findOne({id})

    const user = User.create(profile);
    const userWithLogin = User.createLogin(user, login);

    return userWithLogin;
  },
  
  save: async (userData, options) => {
    const profile = User.getProfile(userData);
    const login = User.getLogin(userData);
  
    const savedProfile = await userProfileDataStore.save(profile)
    const savedLogin = (login)
      ? await userLoginDataStore.save(login)
      : undefined
    
    return User.createLogin(savedProfile, savedLogin);
  },
  
  remove: async (userId, options={}) => {
    if (options.purge) {
      await userProfileDataStore.purge({id: userId})
      await userLoginDataStore.purge({id: userId})
    } else {
      await userProfileDataStore.remove({id: userId})
      await userLoginDataStore.remove({id: userId})
    }
  }
})


