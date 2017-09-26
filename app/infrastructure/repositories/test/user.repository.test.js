const chai = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../config')
const {assert} = chai


describe("Person Repository", () => {
  let container, personRepository, Person;
  before(() => {
    container = require('../../../container')({config})
    personRepository = container.cradle.personRepository
    Person = container.cradle.personRoot
  })

  describe("saving", () => {
    let savedPerson;

    it("saves a person without a login", async () => {
      const id = uuid()
      const newPerson = Person({id})
      savedPerson = await personRepository.save(newPerson)
    })

    it("returns the saved person", () => {
      assert.isOk(savedPerson);
      assert.property(savedPerson, 'createdAt')
    })
  })
})