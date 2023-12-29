import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePassword(req.user, req.body);
  if (result === null) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message:
        'Password change failed. Ensure the new password is unique and not among the last 2 used.',
      data: null,
    });
  } else {
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully',
      data: result,
    });
  }
});

export const AuthController = {
  loginUser,
  changePassword,
};
