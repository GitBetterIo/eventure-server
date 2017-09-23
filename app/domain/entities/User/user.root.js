const omit = require('lodash/omit')
const uuid = require('uuid/v4')

module.exports = ({helpers, loginEntity}) => {

  const User = {

    /**
     * Add a login to the user
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

  const userPrototype = Object.assign({}, User)

  const CreateUser = (userData) => {
    const missing = helpers.getMissingProps(['id'], userData)
    if (missing.length) throw new Error(`Missing required properties for User: [${missing.join(',')}]`)

    const user = Object.assign(
      Object.create(userPrototype),
      userData
    )

    user.id = user.id || uuid()

    if (userData.login) {
      user.addLogin(userData.login);
    }

    return user
  }

  return CreateUser
  
}