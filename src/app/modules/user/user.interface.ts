/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';
import { Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    planeTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface IPasswordHistory {
  userId: Types.ObjectId;
  previousPassword: string;
  currentPassword: string;
}
