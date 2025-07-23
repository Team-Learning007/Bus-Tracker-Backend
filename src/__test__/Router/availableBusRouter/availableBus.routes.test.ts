import BusTrackerApiResponse from '#libraries/busTrackerApiResponse.js';
import availableBusRouter from '#routes/availableBusRouter/availableBus.routes.js';
import express, { Request, Response } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const app = express();
app.use(express.json());
app.use('/available-bus', availableBusRouter);

vi.mock('#controllers/availableBus.controller.js', () => {
  return {
    AvailableBusController: vi.fn().mockImplementation(() => ({
      availabelBusActivationStatus: vi.fn((_req: Request, res: Response) => {
        const response = new BusTrackerApiResponse(
          true,
          'Mocked Bus Activation',
          undefined,
        );
        return res.status(200).json(response);
      }),
      availableBusDeactivateStatus: vi.fn((_req: Request, res: Response) => {
        const response = new BusTrackerApiResponse(
          true,
          'Mocked Bus Deactivate',
          undefined,
        );
        return res.status(200).json(response);
      }),
      createAvailableBus: vi.fn((_req: Request, res: Response) => {
        const response = new BusTrackerApiResponse(true, 'Mocked Bus Created', {
          busId: 'mock-123',
        });
        return res.status(201).json(response);
      }),
    })),
  };
});

describe('Available Bus Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should create available bus on POST "/available-bus"', async () => {
    const res = await request(app).post('/available-bus').send({
      destination: 'Mumbai',
      driverId: '123456789012345678901234',
      origin: 'Delhi',
    });

    expect(res.status).toBe(201);
    expect(res.text).toBe(
      '{"data":{"busId":"mock-123"},"message":"Mocked Bus Created","success":true}',
    );
  });

  test('should activate status of available bus on PATCH "/available-bus/:id/activate"', async () => {
    const res = await request(app).patch('/available-bus/dummyId121/activate');

    expect(res.status).toBe(200);
    expect(res.text).toBe('{"message":"Mocked Bus Activation","success":true}');
  });

  test('should deactivate status of available bus on PATCH "/available-bus/:id/deactivate"', async () => {
    const res = await request(app).patch(
      '/available-bus/dummyId121/deactivate',
    );

    expect(res.status).toBe(200);
    expect(res.text).toBe('{"message":"Mocked Bus Deactivate","success":true}');
  });
});
