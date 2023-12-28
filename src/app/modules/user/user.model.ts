import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IPasswordHistory, IUser, UserModel } from './user.interface';
import { UserRoleEnum } from './user.constant';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
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
      select: 0,
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

const passwordHistorySchema = new Schema<IPasswordHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  previousPassword: {
    type: String,
    required: true,
  },
  currentPassword: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const password = this.password;
  const hashedPassword = await bcrypt.hash(password, config.saltRound);
  this.password = hashedPassword;
  next();
});

userSchema.statics.isPasswordMatched = async function (
  planeTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);

export const PasswordHistory = model<IPasswordHistory>(
  'PasswordHistory',
  passwordHistorySchema,
);
