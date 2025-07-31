import { RequestChecker } from '#utils/checker/requestChecker.js';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Test Request Checker', () => {
  let requestChecker: RequestChecker;

  beforeAll(() => {
    requestChecker = new RequestChecker();
  });

  test('should test driver Id not found', () => {
    const mockDriverId = '';

    expect(() => {
      requestChecker.driverId(mockDriverId);
    }).toThrowError('Please Provide Driver Id');
  });

  test('should test origin not found', () => {
    const mockOrigin = '';

    expect(() => {
      requestChecker.origin(mockOrigin);
    }).toThrowError('Please Provide origin');
  });

  test('should test destination not found', () => {
    const mockDestination = '';

    expect(() => {
      requestChecker.destination(mockDestination);
    }).toThrowError('Please Provide destination');
  });
});
