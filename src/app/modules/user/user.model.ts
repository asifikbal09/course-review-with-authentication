import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IPasswordHistory,
  IUser,
  PasswordHistoryModel,
  UserModel,
} from './user.interface';
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
      select: 0,
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

const passwordHistorySchema = new Schema<
  IPasswordHistory,
  PasswordHistoryModel
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    prePreviousPassword: {
      type: String,
      default: '',
    },
    previousPassword: {
      type: String,
      default: '',
    },
    currentPassword: {
      type: String,
      required: true,
    },
    passwordChangeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

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

passwordHistorySchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>('User', userSchema);

export const PasswordHistory = model<IPasswordHistory, PasswordHistoryModel>(
  'PasswordHistory',
  passwordHistorySchema,
);
