import { Router } from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewController.createReviewForCourse,
);

export const ReviewRoutes = router;
