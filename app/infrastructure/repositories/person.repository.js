
module.exports = ({ personLoginDataStore, personDataStore, personRoot: Person}) => ({

  get: async (id) => {
    const person = await personDataStore.findOne({id})
    const login = await personLoginDataStore.findOne({id})

    return Person(person).addLogin(login)
  },
  
  save: async (person, options) => {
    const profile = person.getProfile();
    const login = person.getLogin();

    const saveResults = await personDataStore.save(profile)
    const savedPerson = Person(saveResults)

    if (login) {
      const savedLogin = await personLoginDataStore.save(login)
      savedPerson.addLogin(savedLogin);
    }

    return savedPerson
  },
  
  remove: async (personId, options={}) => {
    if (options.purge) {
      await personDataStore.purge({id: personId})
      await personLoginDataStore.purge({id: personId})
    } else {
      await personDataStore.remove({id: personId})
      await personLoginDataStore.remove({id: personId})
    }
  }
})


