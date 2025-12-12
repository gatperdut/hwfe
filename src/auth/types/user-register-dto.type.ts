import { User } from './user.type';

export type UserRegisterDto = User & {
  password: string;
};
