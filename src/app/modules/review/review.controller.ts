import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ReviewServices } from './review.service';

const createReviewForCourse = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewForCourseIntoDB(
    req.user,
    req.body,
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewController = {
  createReviewForCourse,
};
