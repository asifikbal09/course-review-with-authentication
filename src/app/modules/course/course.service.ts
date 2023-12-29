/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Types, isValidObjectId, startSession } from 'mongoose';
import QueryManager from '../../manager/queryManager';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createCourseIntoDB = async (userData: JwtPayload, payload: TCourse) => {
  const { startDate, endDate } = payload;
  const convertedStartDate: Date = new Date(startDate);
  const convertedEndDate: Date = new Date(endDate);
  if (convertedStartDate > convertedEndDate) {
    throw new AppError(500, 'Start date must be before end date.');
  }
  const days = convertedEndDate.getTime() - convertedStartDate.getTime();

  payload.durationInWeeks = Math.ceil(days / (1000 * 60 * 60 * 24 * 7));
  payload.createdBy = userData._id;

  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryManager(
    Course.find().populate('createdBy'),
    query,
  )
    .pagination()
    .sortBy()
    .filterByPrice()
    .filterByTags()
    .filterByDate()
    .filterByLanguage()
    .filterByLevel()
    .filterByProvider()
    .filterByWeeks();
  const result = await courseQuery.modelQuery;

  const totalDoc = await Course.find();

  const meta = {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    total: totalDoc.length,
  };

  return { result, meta };
};

const getCourseWithReviewFromDB = async (id: Types.ObjectId) => {
  if ((await Course.isCourseExists(id.toString())) === null) {
    throw new AppError(500, 'The Course is not found.');
  }

  const findCourseReview = await Course.aggregate([
    //stage-1
    //LookUp stage
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    //Stage-2
    //Match by id
    {
      $match: { _id: id },
    },
  ]);

  const course = await Course.findById(id).populate('createdBy');

  const reviews = findCourseReview[0].reviews;

  return { course, reviews };
};

const getTheBestCourseFromDB = async () => {
  const findBestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $unwind: '$reviews',
    },
    {
      $group: {
        _id: '$_id',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$reviews.rating' },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const course = await Course.findById(findBestCourse[0]._id);
  const averageRating = findBestCourse[0].averageRating;
  const reviewCount = findBestCourse[0].reviewCount;

  return { course, averageRating, reviewCount };
};

const updateCourseDataIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  if ((await Course.isCourseExists(id)) === null) {
    throw new AppError(500, 'The Course is not found.');
  }

  const { tags, details, ...remainingCourseData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  const session = await startSession();

  try {
    session.startTransaction();

    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedUpdatedData[`details.${key}`] = value;
      }
    }

    const basicDataUpdate = await Course.findByIdAndUpdate(
      id,
      modifiedUpdatedData,
      { new: true, session },
    );

    if (!basicDataUpdate) {
      throw new AppError(500, 'Failed to update course!');
    }

    if (tags && tags.length > 0) {
      const deletedTagsName = tags
        .filter((tag) => tag.name && tag.isDeleted)
        .map((tag) => tag.name);

      const deletedTags = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { tags: { name: { $in: deletedTagsName } } },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedTags) {
        throw new AppError(500, 'Failed to update course!');
      }

      const addTagsName = tags.filter((tag) => tag.name && !tag.isDeleted);

      const addTags = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: addTagsName } },
        },
        { new: true, runValidators: true, session },
      );

      if (!addTagsName) {
        throw new AppError(500, 'Failed to update course!');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const course = await Course.findById(id).populate('createdBy');

    return course;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, 'Failed to update course!');
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getCourseWithReviewFromDB,
  getTheBestCourseFromDB,
  updateCourseDataIntoDB,
};
