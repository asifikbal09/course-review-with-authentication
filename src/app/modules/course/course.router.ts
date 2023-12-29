import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.get('/best', CourseController.getTheBestCourse);

export const CourseRoutes = router;
