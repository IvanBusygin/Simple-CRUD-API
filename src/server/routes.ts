import { IncomingMessage, ServerResponse } from 'http';
import { addNewUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/users';
import { IUser } from '../types/users';
import { Endpoint } from '../types/server';
import { InvalidEndpointError, InvalidUUIDError } from '../types/errors';
import { parseEndpoint } from '../helpers/endpoints';
import { isValidUserId } from '../helpers/utils';
import { getRequestBody, parseUserData } from '../helpers/request-body';

export const handlerGET = (req: IncomingMessage, res: ServerResponse): IUser | IUser[] => {
  const { endpoint, userId } = parseEndpoint(req.url ?? '');

  switch (endpoint) {
    case Endpoint.USERS: {
      return getAllUsers();
    }

    case Endpoint.USERS_WITH_ID: {
      if (!isValidUserId(userId)) {
        throw new InvalidUUIDError();
      }
      return getUserById(userId);
    }

    default: {
      throw new InvalidEndpointError();
    }
  }
};

export const handlerPOST = async (req: IncomingMessage, res: ServerResponse): Promise<IUser> => {
  const { endpoint } = parseEndpoint(req.url ?? '');

  if (endpoint !== Endpoint.USERS) {
    throw new InvalidEndpointError();
  }

  const bodyData = await getRequestBody(req);
  const userDto = parseUserData(bodyData);

  return addNewUser(userDto);
};

export const handlerPUT = async (req: IncomingMessage, res: ServerResponse): Promise<IUser> => {
  const { endpoint, userId } = parseEndpoint(req.url ?? '');

  if (endpoint !== Endpoint.USERS_WITH_ID) {
    throw new InvalidEndpointError();
  }

  const bodyData = await getRequestBody(req);
  const userDto = parseUserData(bodyData);

  if (!isValidUserId(userId)) {
    throw new InvalidUUIDError();
  }

  return updateUser(userId, userDto);
};

export const handlerDELETE = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const { endpoint, userId } = parseEndpoint(req.url ?? '');

  if (endpoint !== Endpoint.USERS_WITH_ID) {
    throw new InvalidEndpointError();
  }

  if (!isValidUserId(userId)) {
    throw new InvalidUUIDError();
  }

  deleteUser(userId);
};
