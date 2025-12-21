export type PaginatedMeta = {
  page: number;

  pageSize: number;

  total: number;

  pages: number;
};

export type Paginated<T> = {
  items: T[];

  meta: PaginatedMeta;
};
