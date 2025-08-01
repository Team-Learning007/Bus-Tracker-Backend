import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('#utils/logger/winston-logger.js', () => ({
  default: {
    error: vi.fn(),
    info: vi.fn(),
  },
}));

const connectMock = vi.fn();
vi.mock('mongoose', () => ({
  connect: connectMock,
  default: {
    connect: connectMock,
  },
}));

describe('dbConnect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    connectMock.mockReset();
  });

  test('should throw error mongodb_uri not found', async () => {
    vi.stubEnv('MONGODB_URI', '');

    const dbConnect = (await import('#database/dbConnect.js')).default;

    await expect(dbConnect()).rejects.toThrow('mongo db uri required');
  });

  test('should test mongodb connected', async () => {
    vi.stubEnv('MONGODB_URI', 'mongodb://test');

    connectMock.mockResolvedValueOnce({});
    const dbConnect = (await import('#database/dbConnect.js')).default;

    await expect(dbConnect()).resolves.not.toThrow();
    expect(connectMock).toHaveBeenCalledWith('mongodb://test', {
      maxPoolSize: 10,
      minPoolSize: 1,
    });
  });

  test('should throw error in mongoose connection function', async () => {
    vi.stubEnv('MONGODB_URI', 'mongodb://test');

    connectMock.mockRejectedValueOnce(new Error('database error'));

    const dbConnect = (await import('#database/dbConnect.js')).default;

    await expect(dbConnect()).rejects.toThrow('database error');
  });
});
