import { ERROR_STATUS_CODE } from '#types/responseStatusCode.type.js';

class BadRequest extends Error {
  message: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.status = ERROR_STATUS_CODE.BADREQUEST;
    this.message = message;
  }
}

class InternalServer extends Error {
  message: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.status = ERROR_STATUS_CODE.INTERNALSERVER;
    this.message = message;
  }
}

class LengthRequired extends Error {
  message: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.status = ERROR_STATUS_CODE.LENGTHREQUIRED;
    this.message = message;
  }
}

class NotFound extends Error {
  message: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.status = ERROR_STATUS_CODE.NOTFOUND;
    this.message = message;
  }
}

class Unauthorized extends Error {
  message: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.status = ERROR_STATUS_CODE.UNAUTHORIZED;
    this.message = message;
  }
}

export { BadRequest, InternalServer, LengthRequired, NotFound, Unauthorized };
