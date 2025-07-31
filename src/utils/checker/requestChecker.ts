import { NotFound } from '#errors/busTrackerCustomHttpError.error.js';

export class RequestChecker {
  destination = (destination: string) => {
    if (!destination) throw new NotFound('Please Provide destination');
  };

  driverId = (driverId: string) => {
    if (!driverId) throw new NotFound('Please Provide Driver Id');
  };

  origin = (origin: string) => {
    if (!origin) throw new NotFound('Please Provide origin');
  };
}
