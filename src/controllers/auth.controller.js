const { signupUser } = require('../services/auth.service');

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

module.exports = { signup };