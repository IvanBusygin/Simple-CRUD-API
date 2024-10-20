import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from '../controllers/users';
import { Endpoint } from '../types/server';
import { parseEndpoint } from '../helpers/endpoints';
import { InvalidEndpointError, } from '../types/errors';
import { IUser } from '../types/users';

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
