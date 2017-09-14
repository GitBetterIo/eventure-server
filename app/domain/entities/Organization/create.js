

module.exports = orgData => {
  if (!orgData.name) throw new Error('Missing organization name');

  return Object.assign({}, orgData);
}
