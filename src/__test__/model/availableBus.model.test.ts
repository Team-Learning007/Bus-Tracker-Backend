import { AvailableBus } from '#models/availableBus.model.js';
import IAvailableBus from '#types/availableBus.type.js';
import mongoose from 'mongoose';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('Test Available Bus Model', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should create and save a new available bus successfully', async () => {
    const mockAvailableBusData: IAvailableBus = {
      _driver: new mongoose.Types.ObjectId(),
      _id: new mongoose.Types.ObjectId(),
      active: true,
      createdAt: new Date('2025-05-22T20:48:00.031+00:00'),
      route: {
        endDestination: 'Kolkata',
        startDestination: 'Bhubneswar',
      },
      updatedAt: new Date('2025-06-01T11:08:10.389+00:00'),
    } as IAvailableBus;

    const mockAvailableBusDoc = Object.assign(
      new AvailableBus(),
      mockAvailableBusData,
    );

    const availableBusCreateSpy = vi
      .spyOn(AvailableBus, 'insertOne')
      .mockResolvedValueOnce(mockAvailableBusDoc);

    const newAvailableBus = await AvailableBus.insertOne(mockAvailableBusData);

    expect(availableBusCreateSpy).toHaveBeenCalledWith(mockAvailableBusData);
    expect(newAvailableBus).toMatchObject(mockAvailableBusData);
  });
});
