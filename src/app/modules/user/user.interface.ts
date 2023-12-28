import { Model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(planeTextPassword:string,hashedPassword:string): Promise<boolean>;
}