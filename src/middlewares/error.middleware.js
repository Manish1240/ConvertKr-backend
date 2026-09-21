function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error(error);

  res.status(statusCode).json({
    success: false,
    message: isProduction && statusCode === 500 ? 'Internal server error' : error.message,
  });
}

module.exports = { errorHandler };