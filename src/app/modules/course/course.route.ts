import { Router } from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';

const router = Router();

router.post(
  '/',
  validateRequest(CourseValidation.courseValidationSchema),
  CourseController.createCourse,
);

router.get('/courses', CourseController.getAllCourse);

export const CourseRoutes = router;
