

module.exports = (err, req, res, next) => {
  const status = err.status || 400;

  if (err.isJoi) {
    const details = err.details.reduce((errors, err) => Object.assign(errors, {[err.path.join('.')]: err.message}), {})
    console.error(details)
    return res.status(400).json({
      error: true,
      message: "The input was not valid",
      details
    })
  }

  console.error(err.stack);


  res.status(status).json({error: true, message: err.message});
}
