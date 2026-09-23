const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/app-error');
const { getConfig } = require('../config/env');

const authenticationError = () => new AppError('Invalid email or password', 401);

async function loginUser({ email, password }) {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw authenticationError();
  }

  if (user.status !== 'active') {
    throw new AppError('Account is not active', 401);
  }

  const config = getConfig();
  const accessToken = jwt.sign(
    { userId: user._id.toString() },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn },
  );

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    },
    accessToken,
  };
}

async function signupUser({ name, email, password }) {
  const normalizedEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new AppError('An account with this email is already exists', 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('An account with this email already exists', 409);
    }

    throw error;
  }
}

module.exports = { loginUser, signupUser };