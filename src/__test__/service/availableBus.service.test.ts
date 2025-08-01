import { AvailableBus } from '#models/availableBus.model.js';
import { AvailableBusService } from '#services/availableBus.service.js';
import IAvailableBus from '#types/availableBus.type.js';
import { activateStatus, deactivateStatus } from '#utils/constants.js';
import mongoose from 'mongoose';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

vi.mock('#models/availableBus.model.js', () => ({
  AvailableBus: {
    create: vi.fn(),
    exists: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    updateOne: vi.fn(),
  },
}));

describe('Test Available Bus Service', () => {
  let availableBusService: AvailableBusService;

  beforeEach(() => {
    vi.clearAllMocks();
    availableBusService = new AvailableBusService();
  });

  test('should test driver exists and throw error', async () => {
    const mockDriverId = 'dummyId';

    (AvailableBus.exists as Mock).mockResolvedValueOnce({ _id: mockDriverId });

    await expect(
      availableBusService.driverExists(mockDriverId),
    ).rejects.toThrowError('A driver with this ID is already registered.');
  });

  test('should test driver not exists and throw error', async () => {
    const mockDriverId = 'dummyId';
    (AvailableBus.exists as Mock).mockResolvedValueOnce(null);

    await expect(
      availableBusService.driverNotExists(mockDriverId),
    ).rejects.toThrowError('A driver with this ID is not Register yet.');
  });

  test('should test created bus function', async () => {
    const mockAvailableBusData: IAvailableBus = {
      _id: '60d21b4667d0d8992e610c85',
      activeStatus: true,
      createdAt: new Date(),
      driverId: new mongoose.Types.ObjectId('6876af41462f8ee0522e97ef'),
      route: {
        destination: 'Bilaspur',
        origin: 'Kolkata',
      },
      updatedAt: new Date(),
    } as IAvailableBus;

    (AvailableBus.create as Mock).mockResolvedValueOnce(mockAvailableBusData);

    const result = await availableBusService.createAvailableBus(
      '6876af41462f8ee0522e97ef',
      'Kolkata',
      'Bilaspur',
    );

    expect(result).toBe(mockAvailableBusData);
  });

  test('should test activation status function', async () => {
    (AvailableBus.updateOne as Mock).mockResolvedValueOnce(undefined);
    const dummyDriverId = '6876af41462f8ee0522e97ef';

    await availableBusService.availabelBusActivationStatus(dummyDriverId);

    expect(AvailableBus.updateOne).toHaveBeenCalledTimes(1);
    expect(AvailableBus.updateOne).toHaveBeenCalledWith(
      { driverId: dummyDriverId },
      { activeStatus: activateStatus },
    );
  });

  test('should test deactivation status function', async () => {
    (AvailableBus.updateOne as Mock).mockResolvedValueOnce(undefined);
    const dummyDriverId = '6876af41462f8ee0522e97ef';

    await availableBusService.availableBusDeactivationStatus(dummyDriverId);

    expect(AvailableBus.updateOne).toHaveBeenCalledTimes(1);
    expect(AvailableBus.updateOne).toHaveBeenCalledWith(
      { driverId: dummyDriverId },
      { activeStatus: deactivateStatus },
    );
  });

  test('should test get Available Bus Status', async () => {
    (AvailableBus.findOne as Mock).mockResolvedValueOnce({
      _id: '687f4c6b3fa488286b1bee3b',
      activeStatus: true,
      driverId: '6876af41462f8ee0522e97ef',
    });

    const dummyDriverId = '6876af41462f8ee0522e97ef';

    const result =
      await availableBusService.getAvailableBusStatusByDriverId(dummyDriverId);

    expect(result).toStrictEqual({
      _id: '687f4c6b3fa488286b1bee3b',
      activeStatus: true,
      driverId: '6876af41462f8ee0522e97ef',
    });

    expect(AvailableBus.findOne).toHaveBeenCalledTimes(1);
    expect(AvailableBus.findOne).toHaveBeenCalledWith(
      { driverId: dummyDriverId },
      { activeStatus: 1, driverId: 1 },
    );
  });

  test('should test get Available Bus List', async () => {
    const mockBusList = [
      {
        _id: '687f4c6b3fa488286b1bee3b',
        activeStatus: true,
        driverId: '6876af41462f8ee0522e97ef',
      },
      {
        _id: '687f4c6b3fa488286b1bee33',
        activeStatus: true,
        driverId: '6876af41462f8ee0522e97ef',
      },
    ];

    (AvailableBus.find as Mock).mockImplementation(() => ({
      lean: () => Promise.resolve(mockBusList),
    }));

    const result = await availableBusService.getAvailableBusList();

    expect(result).toEqual([
      {
        _id: '687f4c6b3fa488286b1bee3b',
        activeStatus: true,
        driverId: '6876af41462f8ee0522e97ef',
      },
      {
        _id: '687f4c6b3fa488286b1bee33',
        activeStatus: true,
        driverId: '6876af41462f8ee0522e97ef',
      },
    ]);
    expect(AvailableBus.find).toHaveBeenCalledWith({
      activeStatus: activateStatus,
    });
  });
});
