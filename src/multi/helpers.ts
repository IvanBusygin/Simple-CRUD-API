import http, { IncomingMessage, RequestOptions, ServerResponse } from 'node:http';

import { sendJSONResponse } from '../server/response';
import { HttpMethod, StatusCode } from '../types/server';
import { ErrorMessage } from '../types/errors';
import { LOAD_PORT } from './initServer';

import { IUser } from '../types/users';
import { availableParallelism } from 'os';

export const numCPUs = availableParallelism();

export const sendUpdatedDB = (updatedDB: IUser[]) => {
  if (process.env.MULTI) {
    process.send?.({ type: 'updatedDB', data: updatedDB });
  }
};

let currentServerIndex = 1;

export const forwardRequest = (req: IncomingMessage, res: ServerResponse) => {
  const port = LOAD_PORT + currentServerIndex;

  console.log(`Forwarding request to server ${currentServerIndex} on port ${port}`);

  const options: RequestOptions = {
    hostname: 'localhost',
    port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const requestToServer = http.request(options, (responseFromServer) => {
    res.writeHead(
      responseFromServer.statusCode || StatusCode.ServerError,
      responseFromServer.headers,
    );
    responseFromServer.pipe(res);
  });

  requestToServer.on('error', (err) => {
    sendJSONResponse(res, StatusCode.ServerError, {
      message: `${ErrorMessage.ServerError}: ${(err as Error).message}`,
    });
  });

  if (req.method === HttpMethod.POST || req.method === HttpMethod.PUT) {
    req.pipe(requestToServer);
  } else {
    requestToServer.end();
  }

  currentServerIndex = (currentServerIndex % (numCPUs - 1)) + 1;
};
