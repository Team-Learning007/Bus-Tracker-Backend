import { AvailableBusController } from '#controllers/availableBus.controller.js';
import { BadRequest } from '#errors/busTrackerCustomHttpError.error.js';
import { AvailableBusService } from '#services/availableBus.service.js';
import IAvailableBus from '#types/availableBus.type.js';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { getMockReq, getMockRes } from 'vitest-mock-express';

describe('Test AvailableBus Controller', () => {
  const { mockClear, res } = getMockRes();

  let mockAvailableBusService: AvailableBusService & {
    createAvailableBus: Mock;
    driverExists: Mock;
  };
  let availableBusController: AvailableBusController;

  describe('Test Create Available Bus Function', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockAvailableBusService = {
        createAvailableBus: vi.fn(),
        driverExists: vi.fn(),
      };
      availableBusController = new AvailableBusController(
        mockAvailableBusService as AvailableBusService,
      );

      mockClear();
    });

    test('should return 201 and available bus data created', async () => {
      const mockRequest = {
        destination: 'Bilaspur',
        driverId: '6876af41462f8ee0522e97ef',
        origin: 'Kolkata',
      };

      const req = getMockReq({
        body: mockRequest,
      });

      const mockAvailableBusData: IAvailableBus = {
        _id: '60d21b4667d0d8992e610c85',
        createdAt: new Date(),
        driverId: new mongoose.Types.ObjectId('6876af41462f8ee0522e97ef'),
        route: {
          destination: 'Bilaspur',
          origin: 'Kolkata',
        },
        updatedAt: new Date(),
      } as IAvailableBus;

      mockAvailableBusService.createAvailableBus.mockResolvedValueOnce(
        mockAvailableBusData,
      );

      await availableBusController.createAvailableBus(
        req as unknown as Request,
        res as unknown as Response,
      );

      expect(mockAvailableBusService.createAvailableBus).toHaveBeenCalledWith(
        mockRequest.driverId,
        mockRequest.origin,
        mockRequest.destination,
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(req.body).toStrictEqual(mockRequest);
      expect(res.json).toHaveBeenCalledWith({
        data: mockAvailableBusData,
        message: 'Successfully Created Available Bus',
        success: true,
      });
    });

    test('should throw error if driverId is missing', async () => {
      const req = getMockReq({
        body: { destination: 'Bilaspur', origin: 'Kolkata' },
      });
      await expect(
        availableBusController.createAvailableBus(
          req as unknown as Request,
          res as unknown as Response,
        ),
      ).rejects.toThrowError('Please Provide Driver Id');
    });

    test('should throw error if origin is missing', async () => {
      const req = getMockReq({
        body: { destination: 'Bilaspur', driverId: '6876af41462f8ee0522e97ef' },
      });
      await expect(
        availableBusController.createAvailableBus(
          req as unknown as Request,
          res as unknown as Response,
        ),
      ).rejects.toThrowError('Please Provide origin');
    });

    test('should throw error if destination is missing', async () => {
      const req = getMockReq({
        body: { driverId: '6876af41462f8ee0522e97ef', origin: 'Bilaspur' },
      });
      await expect(
        availableBusController.createAvailableBus(
          req as unknown as Request,
          res as unknown as Response,
        ),
      ).rejects.toThrowError('Please Provide destination');
    });

    test('should throw error if Driver Id format invalid', async () => {
      const mockDriverId = '6876af41462f8ee0522e97efdddd';
      const req = getMockReq({
        body: {
          destination: 'Bilaspur',
          driverId: mockDriverId,
          origin: 'Bilaspur',
        },
      });
      await expect(
        availableBusController.createAvailableBus(
          req as unknown as Request,
          res as unknown as Response,
        ),
      ).rejects.toThrowError(`${mockDriverId} This driverId format is invalid`);
    });

    test('should throw error if Driver already exists', async () => {
      const mockRequest = {
        destination: 'Bilaspur',
        driverId: '6876af41462f8ee0522e97ef',
        origin: 'Kolkata',
      };

      const req = getMockReq({
        body: mockRequest,
      });

      const error = new BadRequest(
        'A driver with this ID is already registered.',
      );
      mockAvailableBusService.driverExists.mockRejectedValueOnce(error);

      await expect(
        availableBusController.createAvailableBus(
          req as unknown as Request,
          res as unknown as Response,
        ),
      ).rejects.toThrowError('A driver with this ID is already registered.');
    });
  });
});
