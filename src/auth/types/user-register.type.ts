import { User } from './user.type';

export type UserRegister = User & {
  password: string;
};
