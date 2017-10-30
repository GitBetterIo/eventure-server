
const validateNewRegistration = require('./validateNewRegistration')

module.exports = {
  newRegistration: [
    validateNewRegistration,
    async function(req, res, next) {
      console.log("Create new registration body:", req.body)

      res.json({ok: 'ok'})
    }
  ]
}