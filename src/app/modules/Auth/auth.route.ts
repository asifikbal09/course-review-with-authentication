import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { UserController } from '../user/user.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  UserController.createUser,
);

export const AuthRoutes = router;
