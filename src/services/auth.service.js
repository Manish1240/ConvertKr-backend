const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const AppError = require('../utils/app-error');

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

module.exports = { signupUser };