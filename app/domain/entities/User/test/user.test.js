const {assert} = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../../config');

describe("User Root Aggregate", () => {
  let container, User;
  before(() => {
    container = require('../../../../container')({config})
    User = container.cradle.userRoot;
  })

  describe("creating", () => {
    it("Creates a user", () => {
      const userData = {
        id: uuid(),
      }
      const user = User(userData)
      assert.isOk(user)
    })
  })

  describe("getters", () => {
    it('gets the profiles as a plain object', () => {
      const id = uuid();
      const userData = {
        id,
        firstName: 'a',
        lastName: 'b',
      }
      const user = User(userData)

      const profile = user.getProfile()
      Object.keys(profile).forEach(key => assert.notEqual(typeof profile[key], 'function') )

    })
  })
})