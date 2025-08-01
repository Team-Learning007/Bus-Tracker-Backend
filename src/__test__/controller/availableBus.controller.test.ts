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
    availabelBusActivationStatus: Mock;
    availableBusDeactivationStatus: Mock;
    createAvailableBus: Mock;
    driverExists: Mock;
    driverNotExists: Mock;
    getAvailableBusList: Mock;
    getAvailableBusStatusByDriverId: Mock;
  };
  let availableBusController: AvailableBusController;

  describe('Test Create Available Bus Function', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockAvailableBusService = {
        availabelBusActivationStatus: vi.fn(),
        availableBusDeactivationStatus: vi.fn(),
        createAvailableBus: vi.fn(),
        driverExists: vi.fn(),
        driverNotExists: vi.fn(),
        getAvailableBusList: vi.fn(),
        getAvailableBusStatusByDriverId: vi.fn(),
      };
      availableBusController = new AvailableBusController(
        mockAvailableBusService as AvailableBusService,
      );

      mockClear();
    });

    describe('Create Available Bus Function Test', () => {
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
          body: {
            destination: 'Bilaspur',
            driverId: '6876af41462f8ee0522e97ef',
          },
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
        ).rejects.toThrowError(
          `${mockDriverId} This driverId format is invalid`,
        );
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

    describe('Available Bus Activation Status Function Test', () => {
      test('should return 200 with Bus Activation Successfully message', async () => {
        const mockRequest = {
          driverId: 'dummyId',
        };

        const req = getMockReq({
          params: mockRequest,
        });

        mockAvailableBusService.availabelBusActivationStatus.mockResolvedValueOnce(
          undefined,
        );

        await availableBusController.availabelBusActivationStatus(
          req as unknown as Request,
          res as unknown as Response,
        );

        expect(
          mockAvailableBusService.availabelBusActivationStatus,
        ).toHaveBeenCalledWith(mockRequest.driverId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(req.params).toStrictEqual(mockRequest);
        expect(res.json).toHaveBeenCalledWith({
          data: {},
          message: 'Bus Activate Successfully',
          success: true,
        });
      });

      test('should throw error if driverId not provided', async () => {
        const req = getMockReq({
          params: {},
        });

        await expect(
          availableBusController.availabelBusActivationStatus(
            req as unknown as Request,
            res as unknown as Response,
          ),
        ).rejects.toThrowError('Please Provide Driver Id');
      });

      test('should throw error if driver not exsits in available bus', async () => {
        const req = getMockReq({
          params: { driverId: 'dummyId' },
        });

        const error = new BadRequest('Driver Id not exists');
        mockAvailableBusService.availabelBusActivationStatus.mockRejectedValueOnce(
          error,
        );

        await expect(
          availableBusController.availabelBusActivationStatus(
            req as unknown as Request,
            res as unknown as Response,
          ),
        ).rejects.toThrowError('Driver Id not exists');
      });
    });

    describe('Available Bus Deactivation Status Function Test', () => {
      test('should return 200 with Bus Deactivation Successfully message', async () => {
        const mockRequest = {
          driverId: 'dummyId',
        };

        const req = getMockReq({
          params: mockRequest,
        });

        mockAvailableBusService.availableBusDeactivationStatus.mockResolvedValueOnce(
          undefined,
        );

        await availableBusController.availableBusDeactivateStatus(
          req as unknown as Request,
          res as unknown as Response,
        );

        expect(
          mockAvailableBusService.availableBusDeactivationStatus,
        ).toHaveBeenCalledWith(mockRequest.driverId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(req.params).toStrictEqual(mockRequest);
        expect(res.json).toHaveBeenCalledWith({
          data: {},
          message: 'Bus Deactivate Successfully',
          success: true,
        });
      });

      test('should throw error if driverId not provided', async () => {
        const req = getMockReq({
          params: {},
        });

        await expect(
          availableBusController.availableBusDeactivateStatus(
            req as unknown as Request,
            res as unknown as Response,
          ),
        ).rejects.toThrowError('Please Provide Driver Id');
      });

      test('should throw error if driver not exsits in available bus', async () => {
        const req = getMockReq({
          params: { driverId: 'dummyId' },
        });

        const error = new BadRequest('Driver Id not exists');
        mockAvailableBusService.availableBusDeactivationStatus.mockRejectedValueOnce(
          error,
        );

        await expect(
          availableBusController.availableBusDeactivateStatus(
            req as unknown as Request,
            res as unknown as Response,
          ),
        ).rejects.toThrowError('Driver Id not exists');
      });
    });

    describe('Get Available Bus status Function Test', () => {
      test('should throw error if driverId not provided', async () => {
        const req = getMockReq({
          params: {},
        });

        await expect(
          availableBusController.getAvailableBusStatusByDriverId(
            req as unknown as Request,
            res as unknown as Response,
          ),
        ).rejects.toThrowError('Please Provide Driver Id');
      });

      test('should throw error if driver not exsits in available bus', async () => {
        const req = getMockReq({
          params: { driverId: 'dummyId' },
        });

        const error = new BadRequest('Driver Id not exists');
        mockAvailableBusService.getAvailableBusStatusByDriverId.mockRejectedValueOnce(
          error,
        );

        await expect(
          availableBusController.getAvailableBusStatusByDriverId(
            req as unknown as Request,
            res as unknown as Response,
          ),
        ).rejects.toThrowError('Driver Id not exists');
      });

      test('should return 200 with Bus Active Status Successfully message', async () => {
        const mockRequest = {
          driverId: 'dummyId',
        };

        const req = getMockReq({
          params: mockRequest,
        });

        mockAvailableBusService.getAvailableBusStatusByDriverId.mockResolvedValueOnce(
          {
            _id: '687f4c6b3fa488286b1bee3b',
            activeStatus: true,
            driverId: '6876af41462f8ee0522e97ef',
          },
        );

        await availableBusController.getAvailableBusStatusByDriverId(
          req as unknown as Request,
          res as unknown as Response,
        );

        expect(
          mockAvailableBusService.getAvailableBusStatusByDriverId,
        ).toHaveBeenCalledWith(mockRequest.driverId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(req.params).toStrictEqual(mockRequest);
        expect(res.json).toHaveBeenCalledWith({
          data: {
            _id: '687f4c6b3fa488286b1bee3b',
            activeStatus: true,
            driverId: '6876af41462f8ee0522e97ef',
          },
          message: 'Successfully Get Available Bus',
          success: true,
        });
      });
    });

    describe('Get Available Bus List', () => {
      test('should return 200 with list of bus details', async () => {
        const req = getMockReq();

        mockAvailableBusService.getAvailableBusList.mockResolvedValueOnce([
          {
            _id: '687f4c6b3fa488286b1bee3b',
            activeStatus: true,
            driverId: '6876af41462f8ee0522e97ef',
          },
          {
            _id: '687f4c6b3fa488286b1bee32',
            activeStatus: true,
            driverId: '6876af41462f8ee0522e97ef',
          },
        ]);

        await availableBusController.getAvailableBusList(
          req as unknown as Request,
          res as unknown as Response,
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          data: [
            {
              _id: '687f4c6b3fa488286b1bee3b',
              activeStatus: true,
              driverId: '6876af41462f8ee0522e97ef',
            },
            {
              _id: '687f4c6b3fa488286b1bee32',
              activeStatus: true,
              driverId: '6876af41462f8ee0522e97ef',
            },
          ],
          message: 'Successfully Get Available Bus',
          success: true,
        });
      });
    });
  });
});
