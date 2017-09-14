

module.exports = (err, req, res, next) => {
  const status = err.status || 400;

  console.log(err.stack);

  res.status(status).json({error: true, message: err.message});
}
