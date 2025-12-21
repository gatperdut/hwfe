import { Pagination } from '../../types/pagination.type';

export type UserSearchDto = Pagination & {
  term: string;
};
