import { z } from 'zod';

const userLoginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required.' }),
    password: z.string({ required_error: 'password is required.' }),
  }),
});

const userChangePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({ required_error: 'currentPassword is required.' }),
    newPassword: z.string({ required_error: 'newPassword is required.' }),
  }),
});



export const AuthValidation = {
  userLoginValidationSchema,
  userChangePasswordValidationSchema
};
