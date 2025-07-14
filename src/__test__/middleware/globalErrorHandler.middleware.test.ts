import type { NextFunction, Request, Response } from 'express';

import globalErrorHandlerMiddleware from '#middlewares/globalErrorHandler.middleware.js';
import { ERROR_STATUS_CODE } from '#types/responseStatusCode.type.js';
import logger from '#utils/logger/winston-logger.js';
import createHttpError from 'http-errors';
import { HttpError } from 'http-errors';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getMockReq, getMockRes } from 'vitest-mock-express';

const req = getMockReq() as unknown as Request;
const { next, res } = getMockRes() as unknown as {
  next: NextFunction;
  res: Response;
};

vi.mock('#utils/logger/winston-logger.js');
vi.mock('#types/responseStatusCode.type.js');

// const mockCheckDevelopmentNodeEnviornment = vi.fn()
vi.mock('checkDevelopmentNodeEnviornment');

describe('Test Global Error Handler Middleware', () => {
  beforeEach(() => {
    vi.mock('http-errors', { spy: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should return a proper error response', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const errorCode = ERROR_STATUS_CODE.NOTFOUND;
    const errorMessage = 'Resource Not Found';
    const error = createHttpError(errorCode, errorMessage);

    globalErrorHandlerMiddleware(error, req, res, next);

    expect(logger.debug).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(errorCode);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
        errorcode: errorCode,
        message: errorMessage,
        success: false,
      }),
    );
  });

  test('should not call logger.debug method in production environment', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const error = createHttpError();

    globalErrorHandlerMiddleware(error, req, res, next);

    expect(logger.debug).not.toHaveBeenCalled();
  });

  test('should use default status and message when no parameters are provided to the function', () => {
    const error = {} as HttpError;

    globalErrorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
        errorcode: 500,
        message: 'Something went wrong',
        success: false,
      }),
    );
  });
});
