import { IncomingMessage, ServerResponse } from 'http';
import { addNewUser, getAllUsers, getUserById } from '../controllers/users';
import { Endpoint } from '../types/server';
import { parseEndpoint } from '../helpers/endpoints';
import { InvalidEndpointError, } from '../types/errors';
import { IUser } from '../types/users';
import { getRequestBody, parseUserData } from '../helpers/request-body';

export const handlerGETMethod = (request: IncomingMessage, response: ServerResponse): IUser | IUser[] => {
  const { endpoint, userId } = parseEndpoint(request.url ?? '');

  switch (endpoint) {
    case Endpoint.USERS: {
      return getAllUsers();
    }

    case Endpoint.USERS_WITH_ID: {
      return getUserById(userId);
    }

    default: {
      throw new InvalidEndpointError();
    }
  }
};

export const handlerPOSTMethod = async (request: IncomingMessage, response: ServerResponse) => {
  const { endpoint } = parseEndpoint(request.url ?? '');

  const bodyData = await getRequestBody(request);
  const userDto = parseUserData(bodyData);

  if (endpoint !== Endpoint.USERS) {
    throw new InvalidEndpointError();
  }

  return addNewUser(userDto);
};

