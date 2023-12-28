import { z } from 'zod';

const userLoginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required.' }),
    password: z.string({ required_error: 'password is required.' }),
  }),
});

export const AuthValidation = {
  userLoginValidationSchema,
};
