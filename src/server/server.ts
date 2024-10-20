import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse, sendJSONResponse } from './response';
import { handlerGETMethod, handlerPOSTMethod } from './routes';
import { HttpMethod, StatusCode } from '../types/server';
import { InvalidHTTPMethodError } from '../types/errors';

export const server = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    switch (request.method) {
      case HttpMethod.GET: {
        const resultRes = handlerGETMethod(request, response);
        sendJSONResponse(response, StatusCode.OK, resultRes);
        break;
      }

      case HttpMethod.POST: {
        const resultRes = await handlerPOSTMethod(request, response);
        sendJSONResponse(response, StatusCode.Created, resultRes);
        break;
      }

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
