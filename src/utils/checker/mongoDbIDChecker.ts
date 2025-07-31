import { BadRequest } from '#errors/busTrackerCustomHttpError.error.js';
import { isValidObjectId } from 'mongoose';

export const mongoDbDriverIdFormatChecker = (
  driverId: string,
  errorMessage: string,
) => {
  if (!isValidObjectId(driverId)) throw new BadRequest(errorMessage);
};
