import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: IUser) => {
  const newUser = await User.create(payload);
  const result = await User.findById(newUser._id).select({ password: 0 });
  return result;
};

export const UserService = {
  createUserIntoDB,
};
