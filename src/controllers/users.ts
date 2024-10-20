import { users } from '../database/db';
import { isValidUserId } from '../helpers/utils';
import { InvalidUUIDError, UserNotFoundError } from '../types/errors';

export const getAllUsers = () => {
  return users;
};

export const getUserById = (userId:  string | undefined) => {
  if (!isValidUserId(userId)) {
    throw new InvalidUUIDError();
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new UserNotFoundError();
  }
  return user
};
