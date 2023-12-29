import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidation.categoryValidationSchema),
  CategoryControllers.createCategoryForCourse,
);

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
