

module.exports.getMissingFields = function(obj, requiredFields) {
  return requiredFields.filter(fld => !obj.hasOwnProperty(fld));
}
