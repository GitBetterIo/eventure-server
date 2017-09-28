const chai = require('chai');
const chaiHttp = require('chai-http');
const {container, truncateAll, initMockApp} = require('./mockApp');
const server = require('../../http')(container);
const uuid = require('uuid/v4')
const {assert} = chai;
const {personDataStore} = container.cradle

chai.use(chaiHttp);


describe("Person Routes", () => {
  let organization, user, accessToken;

  before(async () => {
    mockApp = await initMockApp()
    organization = mockApp.organization
    user = mockApp.user
    accessToken = mockApp.accessToken
  })

  after(async () => {
    await truncateAll()
  })

  describe("Updating a person", () => {
    let person
    const organizationId = uuid()
    const personData = {
      id: uuid(),
      organizationId: organizationId,
      firstName: 'test',
      lastName: 'person',
      gender: 'male',
    }
    

    before(async () => {
      person = await personDataStore.save(personData)
    })

    after(async () => {
      await personDataStore.purge({id: personData.id})
    })

    it("updates a person name", async () => {
      const newPersonData = Object.assign({}, personData, {
        firstName: 'newFirst',
        lastName: 'newLast'
      })

      const res = await chai.request(server)
        .put(`/api/v1/person/${person.id}`)
        .send(newPersonData)
        .set('Authorization', `Bearer ${accessToken.token}`)
        .set('Organization', organizationId)

      assert.propertyVal(res, 'status', 200);

      const checkPerson = await personDataStore.findOne({id: personData.id})

      assert.equal(checkPerson.id, personData.id)
      assert.equal(checkPerson.email, personData.email)
      assert.equal(checkPerson.gender, personData.gender)
      assert.equal(checkPerson.firstName, 'newFirst')
      assert.equal(checkPerson.lastName, 'newLast')
    })
    
  })

})