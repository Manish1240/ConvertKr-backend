const dotenv = require('dotenv');

dotenv.config();

function getConfig() {
  const port = Number(process.env.PORT || 3000);
  const nodeEnv = process.env.NODE_ENV || 'development';

  if (!process.env.MONGO_URI) {
    throw new Error('Configuration error: MONGO_URI is required.');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('Configuration error: JWT_SECRET is required.');
  }

  if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('Configuration error: JWT_EXPIRES_IN is required.');
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Configuration error: PORT must be an integer between 1 and 65535.');
  }

  return Object.freeze({
    port,
    mongoUri: process.env.MONGO_URI,
    nodeEnv,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = { getConfig };