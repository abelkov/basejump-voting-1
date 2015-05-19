exports.notFound = function(req, res, next) {
  res.status(404);
  res.send('404 Error');
};

exports.serverError = function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('500 Error');
};
