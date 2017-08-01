// eventure.js
const utils = require('../../lib/utils');

/**
 * {
 * 	clientId: String,
 * 	name: String,
 * 	createdBy: String,
 * 	startDate: DateTime,
 * 	endDate: DateTime,
 * 	createdOn: DateTime,
 * 	modifiedOn: DateTime,
 * }
 */

module.exports.create = function(eventureData) {
  const missing = utils.getMissingFields(eventureData, [
    'clientId',
    'name'
  ]);

  if (missing.length) {
    throw new Error(`Cannot create eventure: missing fields [${missing.join(', ')}]`);
  }

  const defaults = {
    createDate: new Date(),
  }


  return Object.assign({}, defaults, eventureData);
}
