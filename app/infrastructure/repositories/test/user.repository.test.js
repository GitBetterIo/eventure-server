const chai = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../config')
const {assert} = chai


describe("User Repository", () => {
  let container, userRepository, User;
  before(() => {
    container = require('../../../container')({config})
    userRepository = container.cradle.userRepository
    User = container.cradle.userRoot
  })

  describe("saving", () => {
    let savedUser;

    it("saves a user without a login", async () => {
      const id = uuid()
      const newUser = User({id})
      savedUser = await userRepository.save(newUser)
    })

    it("returns the saved user", () => {
      assert.isOk(savedUser);
      assert.property(savedUser, 'createdAt')
    })
  })
})