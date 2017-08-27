
module.exports = ({application}) => {

  function startRegistration(req, res, next) {
    const {SUCCESS, ERROR, EMAIL_ERROR} = application.userService.startRegistration.outputs;
    const regData = req.body;

    const required = ['username', 'password', 'email'];
    const missing = required.filter(fld => !regData.hasOwnProperty(fld));
    if (missing.length) {
      const err = new Error(`Missing required fields [${missing.join(',')}]`);
      return next(err);
    }

    application.userService.startRegistration(regData)
      .on(ERROR, err => next(err))
      .on(EMAIL_ERROR, err => next(err))
      .on(SUCCESS, response => res.json(response))
      .execute();

  }

  return {
    startRegistration,
  }
}
