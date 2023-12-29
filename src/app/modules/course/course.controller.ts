import { Request, Response } from 'express';
import { CourseServices } from './course.service';
import { ObjectId } from 'mongodb';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const course = req.body;
  const userData = req.user;
  const result = await CourseServices.createCourseIntoDB(userData, course);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course created successfully.',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getAllCourseFromDB(query);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: result.meta,
    data: result.result,
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
    data: result,
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

const updateCourseData = catchAsync(async (req, res) => {
  const updatedData = req.body;
  const id = req.params.courseId;

  const data = await CourseServices.updateCourseDataIntoDB(id, updatedData);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: data,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getCourseWithReview,
  getTheBestCourse,
  updateCourseData,
};
