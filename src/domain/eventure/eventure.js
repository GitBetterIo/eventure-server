// eventure.js
const utils = require('../../lib/utils');

module.exports.create = function(eventureData) {
  const missing = utils.getMissingFields(eventureData, [
    'clientId',
    'name'
  ]);

  if (missing.length) {
    throw new Error(`Cannot create eventure: missing fields [${missing.join(', ')}]`);
  }

  const defaults = {
    capacity: 0,          // No limit
  }


  return Object.assign({}, defaults, eventureData);
}
