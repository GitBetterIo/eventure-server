

module.exports = (err, req, res, next) => {
  const status = err.status || 400;

  // if (err.isJoi) {
  // }
  console.log(err.stack);


  res.status(status).json({error: true, message: err.message});
}
