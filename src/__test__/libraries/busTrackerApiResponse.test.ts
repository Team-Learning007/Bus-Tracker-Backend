import BusTrackerApiResponse from '#libraries/busTrackerApiResponse.js';
import { describe, expect, test } from 'vitest';

describe('Test BusTrackerApiResponse class', () => {
  test('should return object of bus tracker API_RESPONSE', () => {
    const mockBusTrackerApiResponse = {
      data: {},
      message: 'data send successfully',
      success: true,
    };

    const response = new BusTrackerApiResponse(
      true,
      'data send successfully',
      {},
    );

    expect(response).toBeInstanceOf(BusTrackerApiResponse);
    expect(response).toMatchObject(mockBusTrackerApiResponse);
  });

  test('should return object of bus tracker API_RESPONSE on error', () => {
    const mockBusTrackerApiResponse = {
      data: {},
      errorcode: 404,
      message: 'Not Found',
      success: false,
    };

    const response = new BusTrackerApiResponse(false, 'Not Found', {}, 404);

    expect(response).toBeInstanceOf(BusTrackerApiResponse);
    expect(response).toMatchObject(mockBusTrackerApiResponse);
  });
});
