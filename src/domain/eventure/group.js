// listing.js
const utils = require('../../lib/utils');

module.exports.create = data => {
  data = data || {};

  const missing = utils.getMissingFields(regData, [
    'listingId',
    'name'
  ]);

  if (missing.length) {
    throw new Error(`Cannot create group: missing fields [${missing.join(', ')}]`);
  }

  const defaults = {};

  return Object.assign({}, defaults, data);
}
