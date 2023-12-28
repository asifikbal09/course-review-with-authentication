import httpStatus from "http-status";
import AppError from "../errors/appError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import jwt from "jsonwebtoken"
import config from "../config";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const decoded = jwt.verify(
        token,
        config.access_secret as string,
      ) as JwtPayload;
  
      const { role,_id } = decoded;
  
      const user = await User.findById(_id);
  
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
    //   if (
    //     user.passwordChangedAt &&
    //     User.isJWTIssuedBeforePasswordChanged(
    //       user.passwordChangedAt,
    //       iat as number,
    //     )
    //   ) {
    //     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    //   }
  
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized user!',
        );
      }
  
      req.user = decoded as JwtPayload & { role: string };
      next();
    });
  };
  
  export default auth;