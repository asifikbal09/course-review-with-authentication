import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TChangePassword, TUserLogin } from './auth.interface';
import { createToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ username: payload.username }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string,
  );

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.findById(userData._id).select('+password');
  const sendUser = await User.findById(userData._id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (
    !(await User.isPasswordMatched(payload.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current password do not matched');
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    config.saltRound,
  );

  await User.findByIdAndUpdate(userData._id, {
    password: newHashedPassword,
  });

  return sendUser;
};

export const AuthService = {
  loginUser,
  changePassword,
};
