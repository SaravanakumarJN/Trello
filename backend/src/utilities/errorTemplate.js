function errorTemplate(res, statusCode, msg) {
  return res.status(statusCode).json({
    error: true,
    message: msg,
  });
}

module.exports = { errorTemplate };
