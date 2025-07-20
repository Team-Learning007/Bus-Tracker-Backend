import { BadRequest } from '#errors/busTrackerCustomHttpError.error.js';
import { AvailableBus } from '#models/availableBus.model.js';
import IAvailableBus from '#types/availableBus.type.js';
import mongoose from 'mongoose';

export class AvailableBusService {
  createAvailableBus = async (
    driverId: string,
    origin: string,
    destination: string,
  ) => {
    const availableBusData: IAvailableBus = {
      active: true,
      driverId: new mongoose.Types.ObjectId(driverId),
      route: {
        destination: destination,
        origin: origin,
      },
    } as IAvailableBus;

    const availableBus = await AvailableBus.create(availableBusData);

    return availableBus;
  };

  driverExists = async (driverId: string) => {
    const driverExists = await AvailableBus.exists({ driverId: driverId });
    if (driverExists)
      throw new BadRequest('A driver with this ID is already registered.');
  };
}
