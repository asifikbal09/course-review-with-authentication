import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryForCourseIntoDB = async (
  userData: JwtPayload,
  payload: TCategory,
) => {
  payload.createdBy = userData._id;
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().populate('createdBy');
  return result;
};

export const CategoryServices = {
  createCategoryForCourseIntoDB,
  getAllCategoriesFromDB,
};
