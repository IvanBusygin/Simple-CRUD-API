import { users } from '../database/db';
import { getID, isValidUserId } from '../helpers/utils';
import { InvalidUUIDError, UserNotFoundError } from '../types/errors';
import { IUser, IUserDto } from '../types/users';

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

export const addNewUser = (userDto: IUserDto): IUser  => {
  const newUser = { ...userDto, id: getID() };

  users.push(newUser);

  return newUser;
}
