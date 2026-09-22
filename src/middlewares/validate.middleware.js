const AppError = require('../utils/app-error');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new AppError('Validation failed', 400, result.error.issues));
    }

    req.body = result.data;
    next();
  };
}

module.exports = { validate };