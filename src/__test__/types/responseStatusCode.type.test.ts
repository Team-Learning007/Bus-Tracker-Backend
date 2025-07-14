import { ERROR_STATUS_CODE } from '#types/responseStatusCode.type.js';
import { describe, expect, test } from 'vitest';

describe('Test Response Types', () => {
  test('should test error status code enum', () => {
    const MOCKBADREQUEST = 400;
    const MOCKUNAUTHORIZED = 401;
    const MOCKNOTFOUND = 404;
    const MOCKLENGTHREQUIRED = 411;
    const MOCKINTERNALSERVER = 500;

    const ERROR_STATUS_CODE_RESULT = ERROR_STATUS_CODE;

    expect(ERROR_STATUS_CODE_RESULT.BADREQUEST).toBe(MOCKBADREQUEST);
    expect(ERROR_STATUS_CODE_RESULT.UNAUTHORIZED).toBe(MOCKUNAUTHORIZED);
    expect(ERROR_STATUS_CODE_RESULT.NOTFOUND).toBe(MOCKNOTFOUND);
    expect(ERROR_STATUS_CODE_RESULT.LENGTHREQUIRED).toBe(MOCKLENGTHREQUIRED);
    expect(ERROR_STATUS_CODE_RESULT.INTERNALSERVER).toBe(MOCKINTERNALSERVER);
  });
});
