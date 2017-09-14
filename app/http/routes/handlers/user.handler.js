
module.exports = {
  me: function(req, res, next) {
    res.json(req.user);
  }
}