import { Request, Response } from 'express';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('#utils/logger/winston-logger.js', () => ({
  default: { error: vi.fn(), info: vi.fn() },
}));

const connectMock = vi.fn();
vi.mock('#database/dbConnect.js', () => ({
  default: connectMock,
}));

vi.mock('#routes/AppRouter.js', () => ({
  default: (_req: Request, res: Response) => res.send('Mock Router'),
}));

beforeEach(() => {
  vi.clearAllMocks();
  connectMock.mockReset();
  vi.resetModules();
});

describe('App server', () => {
  test('responds with mocked router', async () => {
    connectMock.mockResolvedValue(undefined);

    const request = await import('supertest');
    const { default: app } = await import('#index.js');

    const res = await request.default(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Mock Router');
  });

  test('starts server and tries to connect to DB', async () => {
    connectMock.mockResolvedValue(undefined);

    await import('#index.js');
    expect(connectMock).toHaveBeenCalled();
  });

  test('logs error when DB connection fails', async () => {
    connectMock.mockRejectedValueOnce(new Error('Database connection error'));

    const { default: logger } = await import('#utils/logger/winston-logger.js');

    await import('#index.js');

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to connect to MongoDB'),
    );
  });
});
