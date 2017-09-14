const chai = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../config')
const {assert} = chai


describe("User Repository", () => {
  let container, userRepository;
  before(() => {
    container = require('../../../container')({config})
    userRepository = container.cradle.userRepository
  })

  describe("saving", () => {
    let savedUser;

    it("saves a user without a login", async () => {
      const id = uuid()
      const newUser = {id}
      savedUser = await userRepository.save(newUser)
    })

    it("returns the saved user", () => {
      assert.isOk(savedUser);
      assert.property(savedUser, 'createdAt')
    })
  })
})