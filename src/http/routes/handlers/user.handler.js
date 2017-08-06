
module.exports = ({config, application}) => {

  return {
    me: function(req, res, next) {
      res.json(req.user);
    }
  }

}
