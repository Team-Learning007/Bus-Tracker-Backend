import {
  AVAILABLE_BUS_COLLECTION,
  AVAILABLE_BUS_NAME,
} from '#utils/constants.js';
import { describe, expect, test } from 'vitest';

describe('Test Constants', () => {
  test('should test available_bus_name exists', () => {
    const mock_available_bus_name = AVAILABLE_BUS_NAME;

    const result = AVAILABLE_BUS_NAME;

    expect(result).toBe(mock_available_bus_name);
  });

  test('should test available_bus_collection exists', () => {
    const mock_available_bus_collection = AVAILABLE_BUS_COLLECTION;

    const result = AVAILABLE_BUS_COLLECTION;

    expect(result).toBe(mock_available_bus_collection);
  });
});
