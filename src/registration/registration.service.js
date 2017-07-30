

module.exports = ({registration, registrationRepository}) => {

  return {
    findById: () => ({}),
    findByParticipant: () => ({}),
    findByEventure: eventureId => ({}),

    /**
     * Registers a participant for an eventure
     * @param  {Object} eventure    Contains eventure/list/group
     * @param  {Participant} participant The participant to register
     * @return {Registration}             The newly created registration
     */
    newRegistration(eventure, participant) {

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
