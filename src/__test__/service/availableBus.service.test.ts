import { AvailableBus } from '#models/availableBus.model.js';
import { AvailableBusService } from '#services/availableBus.service.js';
import IAvailableBus from '#types/availableBus.type.js';
import mongoose from 'mongoose';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('Test Available Bus Service', () => {
  let availableBusService: AvailableBusService;

  beforeEach(() => {
    vi.clearAllMocks();
    availableBusService = new AvailableBusService();
  });

  test('should test driver existe and trow error', async () => {
    const mockDriveId = 'dummyId';
    vi.spyOn(AvailableBus, 'exists').mockResolvedValueOnce({
      _id: mockDriveId,
    });

    await expect(
      availableBusService.driverExists(mockDriveId),
    ).rejects.toThrowError('A driver with this ID is already registered.');
  });

  test('should test created bus function', async () => {
    const mockAvailableBusData: IAvailableBus = {
      _id: '60d21b4667d0d8992e610c85',
      active: true,
      createdAt: new Date(),
      driverId: new mongoose.Types.ObjectId('6876af41462f8ee0522e97ef'),
      route: {
        destination: 'Bilaspur',
        origin: 'Kolkata',
      },
      updatedAt: new Date(),
    } as IAvailableBus;

    const createSpy = vi
      .spyOn(AvailableBus, 'create')
      // @ts-expect-error: Mongoose typings expect an array of full Document objects, but we are providing a single IAvailableBus for mocking simplicity.
      .mockResolvedValueOnce(mockAvailableBusData);

    const availableBusService = new AvailableBusService();

    const result = await availableBusService.createAvailableBus(
      '6876af41462f8ee0522e97ef',
      'Kolkata',
      'Bilaspur',
    );

    expect(createSpy).toHaveBeenCalledWith({
      active: true,
      driverId: new mongoose.Types.ObjectId('6876af41462f8ee0522e97ef'),
      route: {
        destination: 'Bilaspur',
        origin: 'Kolkata',
      },
    });
    expect(result).toBe(mockAvailableBusData);
  });
});
