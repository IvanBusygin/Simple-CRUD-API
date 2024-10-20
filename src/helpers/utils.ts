import { v4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { IUserId } from '../types/users';

export const getID = () => {
  return v4();
};

export const isValidUserId = (uuid: unknown): uuid is IUserId => {
  if (typeof uuid !== 'string') {
    return false;
  }
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};
