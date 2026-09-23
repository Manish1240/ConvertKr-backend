const express = require('express');
const { login, signup } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate.middleware');
const { loginSchema, signupSchema } = require('../validators/auth.validator');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;