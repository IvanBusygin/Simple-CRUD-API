import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse, sendJSONResponse } from './response';
import { handlerDELETE, handlerGET, handlerPOST, handlerPUT } from './routes';
import { HttpMethod, StatusCode } from '../types/server';
import { InvalidHTTPMethodError } from '../types/errors';
import cluster from 'cluster';
import { forwardRequest } from '../multi/helpers';

export const server = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    switch (request.method) {
      case HttpMethod.GET: {
        if (process.env.MULTI && cluster.isPrimary) {
          forwardRequest(request, response);
        } else {
          const resultRes = handlerGET(request, response);
          sendJSONResponse(response, StatusCode.OK, resultRes);
        }
        break;
      }

      case HttpMethod.POST: {
        if (process.env.MULTI && cluster.isPrimary) {
          forwardRequest(request, response);
        } else {
          const resultRes = await handlerPOST(request, response);
          sendJSONResponse(response, StatusCode.Created, resultRes);
        }
        break;
      }

      case HttpMethod.PUT: {
        if (process.env.MULTI && cluster.isPrimary) {
          forwardRequest(request, response);
        } else {
          const resultRes = await handlerPUT(request, response);
          sendJSONResponse(response, StatusCode.Created, resultRes);
        }
        break;
      }

      case HttpMethod.DELETE: {
        if (process.env.MULTI && cluster.isPrimary) {
          forwardRequest(request, response);
        } else {
          await handlerDELETE(request, response);
          sendJSONResponse(response, StatusCode.NoContent);
        }
        break;
      }

      default: {
        throw new InvalidHTTPMethodError();
      }
    }
  } catch (err) {
    sendErrorResponse(response, err);
  }
};
