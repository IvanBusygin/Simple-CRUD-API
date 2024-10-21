export interface IUser {
  id: string;
  age: number;
  username: string;
  hobbies: string[];
}

export type IUserId = string;

export type IUserDto = Omit<IUser, 'id'>;
