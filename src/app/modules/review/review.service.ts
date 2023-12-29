import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { JwtPayload } from 'jsonwebtoken';

const createReviewForCourseIntoDB = async (
  userData: JwtPayload,
  payload: TReview,
) => {
  const course = await Course.findById(payload.courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found.');
  }
  payload.createdBy = userData._id;
  const result = await Review.create(payload);
  return result;
};

export const ReviewServices = {
  createReviewForCourseIntoDB,
};
