

module.exports = (user) => {
  if (!user || !user.id) {
    throw new Error('Expeced a user object with, at least, an id');
  }

  return Object.assign({}, user)
}
