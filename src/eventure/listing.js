// listing.js
const utils = require('../lib/utils');

module.exports.create = data => {
  data = data || {};

  const missing = utils.getMissingFields(regData, [
    'eventureId',
    'name'
  ]);

  if (missing.length) {
    throw new Error(`Cannot create listing: missing fields [${missing.join(', ')}]`);
  }

  const defaults = {};

  return Object.assign({}, defaults, data);
}
