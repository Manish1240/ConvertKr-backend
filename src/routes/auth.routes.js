const express = require('express');
const { signup } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate.middleware');
const { signupSchema } = require('../validators/auth.validator');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);

module.exports = router;