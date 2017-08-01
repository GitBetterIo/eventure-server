const utils = require('../../lib/utils');
const isPlainObject = require('lodash/isPlainObject')


module.exports.create = function create(feeData) {
  feeData = feeData || {};

  const defaults = {
    startDate: new Date(),
    endDate: null,
    rules: [],
  }

  const rules = (feeData.rules && feeData.rules.length)
    ? feeData.rules.map(createFeeRule)
    : [];

  return Object.assign({}, defaults, feeData, {rules});
}


function createFeeRule(ruleData) {
  const missing = utils.getMissingFields(ruleData, ['fee', 'pattern']);
  if (missing.length) {
    throw new Error(`Cannot create fee schedule rule: missing fields [${missing.join(', ')}]`);
  }

  const defaults = { }

  return Object.assign({}, defaults, ruleData);
}
module.exports.createFeeRule = createFeeRule;


module.exports.addRule = function(schedule, ruleData) {
  const rules = schedule.rules.concat(createFeeRule(ruleData));
  return Object.assign({}, schedule, {rules})
}

module.exports.match = function(schedule, resource) {
  const matchingRule = scheule.rules.find(rule => matchRule(rule, resource));
  return (matchingRule) ? matchingRule.fee : null;
}


/**
 * Determines if a rule matches a resource
 *
 * @param  {Rule} rule    Rule object as defined above
 * @param  {Object} resouce Resource object to match rule against
 * @return {Boolean}         true if the rule matches, false otherwise
 */
module.exports.matchRule = function matchRule(rule, resouce) {
  const listingId = dotty.get(resource, 'listing.id');
  return listingId && rule.pattern.listingId === listingId;
}
