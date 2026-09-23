const { loginUser, signupUser } = require('../services/auth.service');

async function login(req, res, next) {
  try {
    const data = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function signup(req, res, next) {
  try {
    const user = await signupUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, signup };