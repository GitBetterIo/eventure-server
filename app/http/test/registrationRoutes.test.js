const chai = require('chai');
const chaiHttp = require('chai-http');
const {container, truncateAll, initMockApp} = require('./mockApp');
const server = require('../../http')(container);
const uuid = require('uuid/v4')
const {assert} = chai;

chai.use(chaiHttp);


describe("Registration Routes", () => {
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

  describe.only('POST /registration', () => {
    let eventure, listing

    before(async () => {
      const eventureId = container.cradle.idService.createId()
      const listingId = container.cradle.idService.createId()
      const evData = {
        id: eventureId,
        organizationId: organization.id,
        name: 'test eventure',
        startDate: new Date(),
        endDate: new Date(),
      }
      const listData = {
        id: listingId,
        organizationId: organization.id,
        eventureId,
        name: 'test listing',
        startDate: new Date(),
        endDate: new Date(),
      }

      
      eventure = container.cradle.eventureRoot(evData)
      listing = eventure.addListing(listData)
      
      await container.cradle.eventureRepository.save(organization.id, eventure)

    })

    const postRegistration = () => chai.request(server)
      .post('/api/v1/registration')
      .set('Organization', organization.id)
      .set('Authorization', `Bearer ${accessToken.token}`) 

    it("creates a single registration for a listing", done => {
      const regData = {
        eventureId: eventure.id,
        listingId: listing.id,
      }

      postRegistration()
        .send(regData)
        .then(res => {
          assert.propertyVal(res, 'status', 200)
          assert.isObject(res.body)
          // other tests?
          done()
        })
        .catch(err => {
          done(new Error(err.response.body.message))
        })
    })
  })
})