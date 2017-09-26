const chai = require('chai');
const chaiHttp = require('chai-http');
const {container, truncateAll, initMockApp} = require('./mockApp');
const server = require('../../http')(container);
const uuid = require('uuid/v4')
const {assert} = chai;

chai.use(chaiHttp);


describe("Eventure Routes", () => {
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

  describe("Creating", () => {
    let testEventure

    it("creates an eventure", done => {
      const evData = {
        id: uuid(),
        name: 'testEventure',
        startDate: new Date(),
        endDate: new Date(),
      }
      chai.request(server)
        .post('/api/v1/eventure')
        .send(evData)
        .set('Organization', organization.id)
        .set('Authorization', `Bearer ${accessToken.token}`)
        .then(res => {
          assert.propertyVal(res, 'status', 200)
          assert.isObject(res.body)
          assert.equal(res.body.organizationId, organization.id)
          testEventure = res.body
          done()
        })
        .catch(done)
      })
      
      it("Creates a listing on the testEventure", done => {
        const listData = {
          id: uuid(),
          eventureId: testEventure.id,
          name: 'testListing',
          startDate: new Date(),
          endDate: new Date(),
        }
        chai.request(server)
        .post(`/api/v1/eventure/${testEventure.id}/listing`)
        .send(listData)
        .set('Organization', organization.id)
        .set('Authorization', `Bearer ${accessToken.token}`)
        .then(res => {
          assert.propertyVal(res, 'status', 200)
          assert.isObject(res.body)
          assert.isArray(res.body.listings)
          done()
        })
        .catch(done)
      })
  })

})