import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ username: payload.username }).select('+password');

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
    user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    },
    accessToken,
  };
};

export const AuthService ={
    loginUser
}
