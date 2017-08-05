const Promise = require('bluebird');

module.exports = ({Registration, registrationRepository}) => {

  return {
    findById: () => ({}),
    findByParticipant: () => ({}),
    findByEventure: eventureId => ({}),

    /**
     * Registers a participant for an eventure
     * @param  {Object} eventureDesc    Contains eventure/list/group
     * @param  {Participant} participant The participant to register
     * @return {Registration}             The newly created registration
     */
    newRegistration(eventureDesc, participant) {
      const {eventure, listing, group} = eventureDesc;

      // TODO: next steps
      // const registrationFee = FeeScheduleService
      //   .findByListing(listing.id)
      //   .then(schedule => {
      //     return FeeSchedule.match(schedule, eventureDesc, participant)
      //   });


      const regData = {
        participantId: participant.id,
        eventureId: eventure.id,
        listingId: listing.id,
        groupId: (group) ? group.id : null,
      }
      const reg = Promise.try(() => Registration.create(regData));


      // TODO: next steps
      // const invoice = Promise.all([reg, registrationFee])
      //   .then(([reg, registrationFee]) => Accounting.invoice.createForRegistration(reg, registrationFee, participant));


      return registrationRepository.save(reg);
    },

    /**
     * Transfers a registration to another participant, but keeps the same
     * eventure, list and group
     *
     * @param  {[type]} registration    [description]
     * @param  {[type]} toParticipantId [description]
     * @return {[type]}                 [description]
     */
    transfer: (registration, toParticipantId) => {
      Registration.transfer(registration)
    },

    /**
     * Transfers a registration to another eventure/list/group, but keeps
     * the same participant
     *
     * @param  {Registration} registration The registration which should be transferred
     * @param  {Object} from         eventure/list/group currently on registration
     * @param  {Object} to           eventure/list/group to which the registration should be transferred
     * @return {Registration}        new registration
     */
    exchange: (registration, from, to) => {

    },

    /**
     * Cancels a regsitration
     * @param  {Registration} regstration The registration to cancel
     * @return {Registration}             The cancelled registration
     */
    cancel: (regstration) => {

    },
  }

}
