import { Model } from 'mongoose';
import { Types } from 'mongoose';

export type TTag = {
  name: string;
  isDeleted: boolean;
};

export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTag];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TDetails;
  createdBy: Types.ObjectId;
};

export interface CourseModel extends Model<TCourse> {
  // eslint-disable-next-line no-unused-vars
  isCourseExists(_id: string): Promise<TCourse | null>;
}
