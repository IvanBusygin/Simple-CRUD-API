import { IUser } from '../types/users';
import { getID } from '../helpers/utils';
import { IMessage } from '../types/server';

export let users: IUser[] = [
  {
    id: getID(),
    username: 'Pavel',
    age: 11,
    hobbies: ['React', 'Vue', 'Tailwind CSS'],
  },
  {
    id: getID(),
    username: 'Ivan',
    age: 22,
    hobbies: ['Node.js', 'PostgreSQL'],
  },
  {
    id: getID(),
    username: 'Alex',
    age: 33,
    hobbies: ['PHP'],
  },
];

export const handleMessage = (message: IMessage) => {
  if (message && message.type === 'updatedDB') {
    users = message.data;
  }
};
