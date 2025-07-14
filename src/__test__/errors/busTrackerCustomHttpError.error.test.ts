import {
  BadRequest,
  InternalServer,
  LengthRequired,
  NotFound,
  Unauthorized,
} from '#errors/busTrackerCustomHttpError.error.js';
import { ERROR_STATUS_CODE } from '#types/responseStatusCode.type.js';
import { describe, expect, test, vi } from 'vitest';

const MockBadRequsetMessage = 'mock badrequest message';
const MockUnAuthorizeMessage = 'mock unauthorize message';
const MockNotFoundMessage = 'mock notfound messsage';
const MockLengthRequiredMessage = 'mock lengthrequired message';
const MockInternalSeverMessage = 'mock internalserver message';

vi.mock('#types/responseStatusCode.type.js', () => ({
  ERROR_STATUS_CODE: {
    BADREQUEST: 400,
    INTERNALSERVER: 500,
    LENGTHREQUIRED: 411,
    NOTFOUND: 404,
    UNAUTHORIZED: 401,
  },
}));

describe('Test Bus Tracker Custom Http Error', () => {
  test('should test BadRequest Error', () => {
    const mockBadRequestResponse = {
      message: MockBadRequsetMessage,
      status: ERROR_STATUS_CODE.BADREQUEST,
    };

    const response = new BadRequest(MockBadRequsetMessage);

    expect(response).toBeInstanceOf(BadRequest);
    expect(response).toMatchObject(mockBadRequestResponse);
  });

  test('should test UnAuthorize Error', () => {
    const mockUnAuthorizeResponse = {
      message: MockUnAuthorizeMessage,
      status: ERROR_STATUS_CODE.UNAUTHORIZED,
    };

    const response = new Unauthorized(MockUnAuthorizeMessage);

    expect(response).toBeInstanceOf(Unauthorized);
    expect(response).toMatchObject(mockUnAuthorizeResponse);
  });

  test('should test NotFound Error', () => {
    const mockNotFoundeResponse = {
      message: MockNotFoundMessage,
      status: ERROR_STATUS_CODE.NOTFOUND,
    };

    const response = new NotFound(MockNotFoundMessage);

    expect(response).toBeInstanceOf(NotFound);
    expect(response).toMatchObject(mockNotFoundeResponse);
  });

  test('should test LengthRequired Error', () => {
    const mockLengthRequiredResponse = {
      message: MockLengthRequiredMessage,
      status: ERROR_STATUS_CODE.LENGTHREQUIRED,
    };

    const response = new LengthRequired(MockLengthRequiredMessage);

    expect(response).toBeInstanceOf(LengthRequired);
    expect(response).toMatchObject(mockLengthRequiredResponse);
  });

  test('should test InternalServer Error', () => {
    const mockInternalServerResponse = {
      message: MockInternalSeverMessage,
      status: ERROR_STATUS_CODE.INTERNALSERVER,
    };

    const response = new InternalServer(MockInternalSeverMessage);

    expect(response).toBeInstanceOf(InternalServer);
    expect(response).toMatchObject(mockInternalServerResponse);
  });
});
