import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/appError';
import { PasswordHistory, User } from '../user/user.model';
import { TChangePassword, TUserLogin } from './auth.interface';
import { createToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { startSession } from 'mongoose';

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

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const sendUser = await User.findById(userData._id);

  const userPasswordHistory = await PasswordHistory.findOne({
    userId: user._id,
  });

  if (!userPasswordHistory) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update password');
  }

  const { currentPassword, previousPassword, prePreviousPassword } =
    userPasswordHistory;

  if (
    !(await User.isPasswordMatched(payload.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current password do not matched');
  }

  if (
    userPasswordHistory &&
    ((await User.isPasswordMatched(payload.newPassword, currentPassword)) ||
      (await User.isPasswordMatched(payload.newPassword, previousPassword)) ||
      (await User.isPasswordMatched(payload.newPassword, prePreviousPassword)))
  ) {
    return null;
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    config.saltRound,
  );
  const session = await startSession();
  try {
    session.startTransaction();
    const updatedUser = await User.findByIdAndUpdate(
      userData._id,
      {
        password: newHashedPassword,
      },
      { new: true, session },
    );

    if (!updatedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update password.');
    }

    await PasswordHistory.findOneAndUpdate(
      { userId: updatedUser._id },
      {
        currentPassword: updatedUser.password,
        previousPassword: currentPassword,
        prePreviousPassword: previousPassword,
        passwordChangeAt: new Date(),
      },
      {
        new: true,
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return sendUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    return null;
  }
};

export const AuthService = {
  loginUser,
  changePassword,
};
