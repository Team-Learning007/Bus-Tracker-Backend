import { mongoDbDriverIdFormatChecker } from '#utils/checker/mongoDbIDChecker.js';
import { describe, expect, test } from 'vitest';

describe('Test Mongo Db ID Checker File', () => {
  describe('should test Invalid driver Id', () => {
    test('should test invalid format of driverId', () => {
      const mockDriverId = 'invalid-id-string-here';
      const mockErrorMessage = 'Driver Id invalid format';

      expect(() => {
        mongoDbDriverIdFormatChecker(mockDriverId, mockErrorMessage);
      }).toThrowError(mockErrorMessage);
    });

    test('should test invalid size of driverId', () => {
      const mockDriverId = 'abcdef1234567890abcdef123456';
      const mockErrorMessage = 'Driver Id invalid size';

      expect(() => {
        mongoDbDriverIdFormatChecker(mockDriverId, mockErrorMessage);
      }).toThrowError(mockErrorMessage);
    });

    test('should handle an empty driver Id', () => {
      const mockDriverId = '';
      const mockErrorMessage = 'No driver Id Found';

      expect(() => {
        mongoDbDriverIdFormatChecker(mockDriverId, mockErrorMessage);
      }).toThrowError(mockErrorMessage);
    });
  });
});
