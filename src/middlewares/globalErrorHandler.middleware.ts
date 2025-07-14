import BusTrackerApiResponse from '#libraries/busTrackerApiResponse.js';
import { ERROR_STATUS_CODE } from '#types/responseStatusCode.type.js';
import checkDevelopmentNodeEnvironment from '#utils/envsChecker.js';
import logger from '#utils/logger/winston-logger.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import * as util from 'util';

function globalErrorHandlerMiddleware(
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = err.status || ERROR_STATUS_CODE.INTERNALSERVER;
  const message = err.message || 'Something went wrong';

  const response = new BusTrackerApiResponse(false, message, {}, status);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const headerInfo = util.inspect(req.header);

  if (checkDevelopmentNodeEnvironment()) {
    logger.debug(
      `REQUEST HANDLING ERROR:
        \nERROR:\n${JSON.stringify(err)}
        \nREQUEST HEADERS:\n${headerInfo}
        \nREQUEST PARAMS:\n${util.inspect(req.params)}
        \nREQUEST QUERY:\n${util.inspect(req.query)}
        \nBODY:\n${util.inspect(req.body)}\n`,
    );
  }

  logger.error(
    `\nSTATUS:\n${String(status)}
    \nERROR MESSAGE:\n${err.message}
    ${String(checkDevelopmentNodeEnvironment() && `\nERROR STACK TRACE:\n${String(err.stack)}`)}`,
  );

  res.status(status).json(response);
}

export default globalErrorHandlerMiddleware;
