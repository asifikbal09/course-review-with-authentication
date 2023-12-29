/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { JsonWebTokenError } from 'jsonwebtoken';
import { TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handelJWTError = (err: JsonWebTokenError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Unauthorized Access.',
    errorMessage:
      'You do not have the necessary permissions to access this resource.',
  };
};

export default handelJWTError;
