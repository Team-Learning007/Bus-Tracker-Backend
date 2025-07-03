import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { Logger } from 'winston';

describe('Logging', () => {
  let logger: Logger;

  beforeEach(async () => {
    logger = (await import('#utils/logger/winston-logger.js')).default;
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  test('should test info message without crashing', () => {
    using loggerSpy = vi
      .spyOn(logger, 'info')
      .mockImplementation((logger) => logger as Logger);

    logger.info('This is an info log');

    expect(loggerSpy).toHaveBeenCalled();
  });

  test('should test proper message shows for error', () => {
    using loggerSpy = vi
      .spyOn(logger, 'error')
      .mockImplementation((logger) => logger as Logger);

    logger.error('This is an error log');

    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('error'));
  });

  test('should test debug not shown in production enviornment', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    vi.resetModules();
    const { default: logger } = await import('#utils/logger/winston-logger.js');

    expect(logger.level).toBe('info');
    expect(logger.level).not.toBe('debug');
  });

  test('should test debug shown in development enviornment', async () => {
    vi.stubEnv('NODE_ENV', 'development');

    vi.resetModules();
    const { default: logger } = await import('#utils/logger/winston-logger.js');

    expect(logger.level).toBe('debug');
  });
});
