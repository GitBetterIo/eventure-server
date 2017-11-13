const uuid = require('uuid/v4')

module.exports = ({config}) => ({
  createId: () => uuid(),
})