import { Router } from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.courseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourse);
router.get('/:courseId/reviews', CourseController.getCourseWithReview);
router.put(
  '/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourseData,
);

export const CoursesRoutes = router;
