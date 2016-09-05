function errorHandler(err, req, res, next) {
  // log error and send back error message
  console.error(err.stack);
  res.status(500).send({ error: err.message });
}

module.exports = {
  errorHandler: errorHandler
};