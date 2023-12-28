import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.userChangePasswordValidationSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
