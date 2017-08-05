const chai = require('chai');
const {assert} = chai;
const makeService = require('../registration.service');


const mock = {
  Registration: {
    create: a => a,
  },
  registrationRepository: {
    save: a => Promise.resolve(a),
  }
}

const registrationService = makeService(mock);

describe('Registration Service', () => {
  describe('newRegistration()', () => {
    it("creates a new registration for a participant", done => {
      const participant = { id: 'pabc' }
      const eventureDesc = {
        eventure: {
          id: 'eventure_a',
          clientId: 'client_a',
        },
        listing: {
          id: 'listing_a',
          eventureId: 'eventure_a',
          name: 'listing_a',
        }
      }

      registrationService.newRegistration(eventureDesc, participant)
        .then(registration => {
          assert.isOk(registration);
          assert.equal(registration.participantId, participant.id)
          done();
        })
        .catch(done);
    })
  });

  describe('transfer()', () => {

  })
});
