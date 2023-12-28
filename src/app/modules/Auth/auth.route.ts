import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

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

export const AuthRoutes = router;
