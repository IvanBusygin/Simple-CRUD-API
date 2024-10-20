import { IncomingMessage } from 'http';
import { InvalidUserDataError } from '../types/errors';
import { IUserDto } from '../types/users';
import { isUserDto } from './utils';

export const getRequestBody = async (req: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString();
};

export const parseUserData = (bodyData: string | undefined): IUserDto => {
  if (!bodyData) {
    throw new InvalidUserDataError();
  }

  const body = JSON.parse(bodyData);
  if (!isUserDto(body)) {
    throw new InvalidUserDataError();
  }

  return body;
};
