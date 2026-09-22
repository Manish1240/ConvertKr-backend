const { z } = require('zod');

const signupSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .strict()
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

module.exports = { signupSchema };