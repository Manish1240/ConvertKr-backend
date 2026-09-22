function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  if (statusCode >= 500) {
    console.error(error);
  }

  const response = {
    success: false,
    message: isProduction && statusCode === 500 ? 'Internal server error' : error.message,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  res.status(statusCode).json(response);
}

module.exports = { errorHandler };