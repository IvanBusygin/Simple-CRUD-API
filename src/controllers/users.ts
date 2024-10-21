import { users } from '../database/db';
import { findUserIdxById, getID } from '../helpers/utils';
import { IUser, IUserDto, IUserId } from '../types/users';
import { sendUpdatedDB } from '../multi/helpers';

export const getAllUsers = () => {
  sendUpdatedDB(users);

  return users;
};

export const getUserById = (userId: IUserId) => {
  const idx = findUserIdxById(users, userId);

  sendUpdatedDB(users);

  return users[idx];
};

export const addNewUser = (userDto: IUserDto): IUser => {
  const newUser = { ...userDto, id: getID() };

  users.push(newUser);

  sendUpdatedDB(users);

  return newUser;
};

export const updateUser = (userId: IUserId, userDto: IUserDto): IUser => {
  const idx = findUserIdxById(users, userId);
  const user = users[idx];

  const updatedUser = { ...user, ...userDto, id: user.id };

  users[idx] = updatedUser;

  sendUpdatedDB(users);

  return updatedUser;
};

export const deleteUser = (userId: IUserId): void => {
  const userIdx = findUserIdxById(users, userId);

  users.splice(userIdx, 1);

  sendUpdatedDB(users);
};
