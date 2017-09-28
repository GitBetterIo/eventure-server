const omit = require('lodash/omit')
const uuid = require('uuid/v4')

module.exports = ({helpers, loginEntity}) => {

  const Person = {

    /**
     * Add a login to the person
     * @param {Object} loginData Plain object containing login data
     */
    addLogin(loginData) {
      if (!loginData) return this
      if (loginData.id && loginData.id !== this.id) {
        throw new Error('Attempting to add a login from one user to another user');
      }

      loginData.id = this.id
      this.login = loginEntity(loginData)

      return this
    },

    matchPassword(pw) {
      return !!this.login && this.login.matchPassword(pw)
    },

    loginUser() {
      if (!this.login) throw new Error('This user does not have the ability to log in to the system')
      this.login.login()
      return this
    },

    updateName({firstName, lastName}) {
      this.firstName = firstName
      this.lastName = lastName
      return this
    },

    updateEmail({email}) {
      this.email = email
      return this
    },

    updateBirthDate({birthDate}) {
      this.birthDate = birthDate
      return this
    },

    /**
     * Return the profile portion of the user
     */
    getProfile() {
      return helpers.toObject(omit(this, ['login']))
    },
    /**
     * Return the login portion of the user
     */
    getLogin() {
      return (this.login) ? helpers.toObject(this.login) : null
    },
    /**
     * Return the id of the user
     */
    getId() {
      return this.id
    },
  }

  const personPrototype = Object.assign({}, Person)

  const CreatePerson = (personData) => {
    const missing = helpers.getMissingProps(['id'], personData)
    if (missing.length) throw new Error(`Missing required properties for erson: [${missing.join(',')}]`)

    const person = Object.assign(
      Object.create(personPrototype),
      personData
    )

    person.id = person.id || uuid()

    if (personData.login) {
      person.addLogin(personData.login);
    }

    return person
  }

  return CreatePerson
  
}