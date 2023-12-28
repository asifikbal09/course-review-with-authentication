import { z } from 'zod';
import { UserRoleEnum } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required.' }),
    password: z
      .string({ required_error: 'password is required.' })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((password) => /\d/.test(password), {
        message: 'Password must contain at least one digit',
      })
      .refine((password) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password), {
        message: 'Password must contain at least one special character',
      }),
    email: z.string({ required_error: 'email is required.' }),
    role: z.enum(UserRoleEnum as [string, ...string[]]).default('user'),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
