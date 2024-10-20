import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse, sendJSONResponse } from './response';
import { handlerGETMethod } from './routes';
import { HttpMethod, StatusCode } from '../types/server';
import { InvalidHTTPMethodError } from '../types/errors';

export const server = (request: IncomingMessage, response: ServerResponse) => {
  try {
    switch (request.method) {
      case HttpMethod.GET: {
        const resultRes = handlerGETMethod(request, response);
        sendJSONResponse(response, StatusCode.OK, resultRes);
        break;
      }

      // case HttpMethod.POST: {
      //   break;
      // }

      // case HttpMethod.PUT: {
      //   break;
      // }

      // case HttpMethod.DELETE: {
      //   break;
      // }

      default: {
        throw new InvalidHTTPMethodError();
      }
    }
  } catch (err) {
    sendErrorResponse(response, err);
  }
};
