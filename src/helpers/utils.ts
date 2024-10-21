import { v4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { IUser, IUserDto, IUserId } from '../types/users';
import { UserNotFoundError } from '../types/errors';

export const getID = () => {
  return v4();
};

export const isValidUserId = (uuid: unknown): uuid is IUserId => {
  if (typeof uuid !== 'string') {
    return false;
  }
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const findUserIdxById = (users: IUser[], userId: IUserId): number => {
  const userIdx = users.findIndex((user) => user.id === userId);

  if (userIdx === -1) {
    throw new UserNotFoundError();
  }

  return userIdx;
};

export const isUserDto = (value: unknown): value is IUserDto => {
  if (typeof value !== 'object' || value === null) return false;

  const { username, age, hobbies } = value as { [key: string]: unknown };

  return (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === 'string')
  );
};
