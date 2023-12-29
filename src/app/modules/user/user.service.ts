import { startSession } from 'mongoose';
import { PasswordHistory, User } from './user.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createUserIntoDB = async (payload: IUser) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([payload], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    const user = newUser[0];
    const { _id, password } = user;
    const passwordHistoryPayload = {
      userId: _id,
      currentPassword: password,
    };

    const createPasswordHistory = await PasswordHistory.create(
      [passwordHistoryPayload],
      { session },
    );
    if (!createPasswordHistory.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await User.findById(_id);
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
  }
};

export const UserService = {
  createUserIntoDB,
};
