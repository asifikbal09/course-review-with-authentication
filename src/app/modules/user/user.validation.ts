import {  z } from 'zod';
import { UserRoleEnum } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    username:z.string({required_error:"username is required."}),
    password:z.string({required_error:"password is required."}),
    email:z.string({required_error:"email is required."}),
    role:z.enum(UserRoleEnum as [string,...string[]]),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
