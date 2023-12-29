/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import AppError from '../errors/appError';
import handleZodError from '../errors/handleZodError';
import handelCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import jwt from 'jsonwebtoken';
import handelJWTError from '../errors/handleJWTError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage = 'Something went wrong!';
  let errorDetails = err;
  let stack = config.NODE_ENV === 'development' ? err?.stack : null;

  if (err instanceof ZodError) {
    const getZodError = handleZodError(err);
    statusCode = getZodError?.statusCode;
    message = getZodError?.message;
    errorMessage = getZodError?.errorMessage;
  } else if (err?.name === 'CastError') {
    const gotCastError = handelCastError(err);
    statusCode = gotCastError?.statusCode;
    message = gotCastError?.message;
  } else if (err?.code === 11000) {
    const gotDuplicateError = handleDuplicateError(err);
    statusCode = gotDuplicateError?.statusCode;
    message = gotDuplicateError?.message;
    errorMessage = gotDuplicateError?.errorMessage;
  } else if (err instanceof jwt.JsonWebTokenError) {
    const gotJWTError = handelJWTError(err);
    statusCode = gotJWTError.statusCode;
    message = gotJWTError.message;
    errorMessage = gotJWTError.errorMessage;
    errorDetails = null;
    stack = null;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorMessage = err?.message;
  } else if (err instanceof Error) {
    errorMessage = err?.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack,
  });
};

export default globalErrorHandler;
