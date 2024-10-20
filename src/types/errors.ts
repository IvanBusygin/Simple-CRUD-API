import { StatusCode } from './server';

export enum ErrorMessage {
  InvalidEndpointError = 'Request to non-existing endpoint',
  InvalidHTTPMethodError = 'Invalid HTTP method',
  InvalidUserDataError = 'Invalid user data: required fields are missing or have wrong format',
  InvalidUUIDError = 'Invalid UUID format',
  ServerError = 'Internal Server error',
  UserNotFoundError = 'User not found',
}

export class HTTPError extends Error {
  constructor(message: string = ErrorMessage.ServerError, public statusCode = StatusCode.ServerError) {
    super(message);
  }
}

export class InvalidEndpointError extends HTTPError {
  constructor(message: string = ErrorMessage.InvalidEndpointError, public statusCode = StatusCode.NotFound) {
    super(message);
  }
}

export class InvalidHTTPMethodError extends HTTPError {
  constructor(message: string = ErrorMessage.InvalidHTTPMethodError, public statusCode = StatusCode.BadRequest) {
    super(message);
  }
}

export class InvalidUserDataError extends HTTPError {
  constructor(message: string = ErrorMessage.InvalidUserDataError, public statusCode = StatusCode.BadRequest) {
    super(message);
  }
}

export class InvalidUUIDError extends HTTPError {
  constructor(message: string = ErrorMessage.InvalidUUIDError, public statusCode = StatusCode.BadRequest) {
    super(message);
  }
}

export class ServerError extends HTTPError {
  constructor(message: string = ErrorMessage.ServerError, public statusCode = StatusCode.ServerError) {
    super(message);
  }
}

export class UserNotFoundError extends HTTPError {
  constructor(message: string = ErrorMessage.UserNotFoundError, public statusCode = StatusCode.NotFound) {
    super(message);
  }
}
