const utils = require('../../lib/utils');

/**
 * Registration Lifecycle
 * Pending  => Active => Complete
 * 										=> Cancelled
 */
const STATUS_PENDING = 'pending';
const STATUS_ACTIVE = 'active';
const STATUS_COMPLETE = 'complete';
const STATUS_CANCELLED = 'cancelled';

module.exports.create = function(regData) {
  const missing = utils.getMissingFields(regData, [
    'clientId',
    'eventureId',
    'listingId',
    'participantId'
  ]);

  if (missing.length) {
    throw new Error(`Cannot create registration: missing fields [${missing.join(', ')}]`);
  }

  const defaults = { }
  const init = {
    status: STATUS_PENDING
  }

  return Object.assign({}, defaults, regData, init);
}


module.exports.setParticipant = (registration, participantId) => Object.assign({}, registration, {participantId});

module.exports.activate = (registration) => Object.assign({}, registration, {status: STATUS_ACTIVE});
module.exports.cancel = (registration) => Object.assign({}, registration, {status: STATUS_CANCELLED});
