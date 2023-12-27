import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import { UserRoleEnum } from './user.constant';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserRoleEnum,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', userSchema);
