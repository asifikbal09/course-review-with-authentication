import { Request, Response } from 'express';
import { CourseServices } from './course.service';
import { ObjectId } from 'mongodb';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createCourse = async (req: Request, res: Response) => {
  const course = req.body;
  const result = await CourseServices.createCourseIntoDB(course);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'course create successfully.',
    data: result,
  });
};

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getAllCourseFromDB(query);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: result.meta,
    result: result.result,
  });
});

const getCourseWithReview = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;

  const result = await CourseServices.getCourseWithReviewFromDB(
    new ObjectId(courseId),
  );
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    result: result,
  });
});

const getTheBestCourse = catchAsync(async (req, res) => {
  const data = await CourseServices.getTheBestCourseFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: data,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getCourseWithReview,
  getTheBestCourse,
};
