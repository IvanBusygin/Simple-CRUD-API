import { ServerResponse } from 'http';
import { StatusCode } from '../types/server';
import { HTTPError } from '../types/errors';

export const sendJSONResponse = (res: ServerResponse, statusCode: StatusCode, data?: unknown) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end();
  }
};

export const sendTextResponse = (
  res: ServerResponse,
  statusCode: StatusCode,
  data: string,
): void => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.end(data);
};

export const sendErrorResponse = (res: ServerResponse, err: unknown): void => {
  if (err instanceof HTTPError) {
    sendTextResponse(res, err.statusCode, `Error: ${err.message}`);
  } else if (err instanceof Error) {
    sendTextResponse(res, StatusCode.ServerError, `Error: ${err.message}`);
  } else {
    sendTextResponse(res, StatusCode.ServerError, 'Error: Unknown error');
  }
};
