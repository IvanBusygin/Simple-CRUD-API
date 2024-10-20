import { v4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { IUserDto, IUserId } from '../types/users';

export const getID = () => {
  return v4();
};

export const isValidUserId = (uuid: unknown): uuid is IUserId => {
  if (typeof uuid !== 'string') {
    return false;
  }
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const isUserDto = (value: unknown): value is IUserDto => {
  if (typeof value !== 'object' || value === null) return false;

  const { username, age, hobbies } = value as { [key: string]: unknown };

  return (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every(hobby => typeof hobby === 'string')
  );
};

