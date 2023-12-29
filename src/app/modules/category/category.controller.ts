import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';

const createCategoryForCourse = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryForCourseIntoDB(
    req.user,
    req.body,
  );
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategoryForCourse,
  getAllCategories,
};
