import checkDevelopmentNodeEnvironment from '#utils/checker/envsChecker.js';
import { describe, expect, test, vi } from 'vitest';

describe('Test Envs Checker', () => {
  test('should return true in development env', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const result = checkDevelopmentNodeEnvironment();

    expect(result).toBe(true);
  });

  test('should return false in production env', () => {
    vi.stubEnv('NODE_ENV', 'production');

    const result = checkDevelopmentNodeEnvironment();

    expect(result).toBe(false);
  });
});
