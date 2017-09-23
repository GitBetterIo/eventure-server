
module.exports = ({ userLoginDataStore, userProfileDataStore, userRoot: User}) => ({

  get: async (id) => {
    const profile = await userProfileDataStore.findOne({id})
    const login = await userLoginDataStore.findOne({id})

    const user = User(profile).addLogin(login)

    return user;
  },
  
  save: async (user, options) => {
    const profile = user.getProfile();
    const login = user.getLogin();

    const savedProfile = await userProfileDataStore.save(profile)
    const savedUser = User(savedProfile)

    if (login) {
      const savedLogin = await userLoginDataStore.save(login)
      savedUser.addLogin(login);
    }

    return savedUser
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


