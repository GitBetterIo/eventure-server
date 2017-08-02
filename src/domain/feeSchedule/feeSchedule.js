const utils = require('../../lib/utils');
const isPlainObject = require('lodash/isPlainObject')


module.exports.create = function create(options) {
  options = options || {};

  const rules = (options.rules && options.rules.length)
    ? options.rules.map(createFeeRule)
    : [];

  const defaults = {};

  return Object.assign({}, defaults, options, {rules});
}


/**
 * Create a fee rule from passed options
 * @param  {[type]} ruleData [description]
 * @return {[type]}          [description]
 */
function createFeeRule(options) {
  const missing = utils.getMissingFields(options, ['listingId', 'amount', 'startDate', 'endDate']);
  if (missing.length) {
    throw new Error(`Cannot create fee schedule rule: missing fields [${missing.join(', ')}]`);
  }

  const defaults = { }
  return Object.assign({}, defaults, options);
}
module.exports.createFeeRule = createFeeRule;


/**
 * Creates a rule and adds it to the schedule
 * @param  {[type]} schedule [description]
 * @param  {[type]} ruleData [description]
 * @return {[type]}          [description]
 */
module.exports.addRule = function(schedule, rule) {
  if (schedule.listingId !== rule.listingId) {
    throw new Error(`Cannot add Fee Schedule Rule: wrong listingId`);
  }

  const rules = schedule.rules.concat(createFeeRule(rule));
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
