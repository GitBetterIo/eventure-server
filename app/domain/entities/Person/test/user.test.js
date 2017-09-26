const {assert} = require('chai')
const uuid = require('uuid/v4')
const config = require('../../../../../config');

describe("Person Root Aggregate", () => {
  let container, Person;
  before(() => {
    container = require('../../../../container')({config})
    Person = container.cradle.personRoot;
  })

  describe("creating", () => {
    it("Creates a person", () => {
      const personData = {
        id: uuid(),
      }
      const person = Person(personData)
      assert.isOk(person)
    })
  })

  describe("getters", () => {
    it('gets the profiles as a plain object', () => {
      const id = uuid();
      const personData = {
        id,
        firstName: 'a',
        lastName: 'b',
      }
      const person = Person(personData)

      const profile = person.getProfile()
      Object.keys(profile).forEach(key => assert.notEqual(typeof profile[key], 'function') )

    })
  })
})