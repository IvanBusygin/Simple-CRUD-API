import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse, sendJSONResponse } from './response';
import { handlerGET, handlerPOST, handlerPUT } from './routes';
import { HttpMethod, StatusCode } from '../types/server';
import { InvalidHTTPMethodError } from '../types/errors';

export const server = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    switch (request.method) {
      case HttpMethod.GET: {
        const resultRes = handlerGET(request, response);
        sendJSONResponse(response, StatusCode.OK, resultRes);
        break;
      }

      case HttpMethod.POST: {
        const resultRes = await handlerPOST(request, response);
        sendJSONResponse(response, StatusCode.Created, resultRes);
        break;
      }

      case HttpMethod.PUT: {
        const resultRes = await handlerPUT(request, response);
        sendJSONResponse(response, StatusCode.Created, resultRes);
        break;
      }

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
