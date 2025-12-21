import { WritableSignal } from '@angular/core';

export type PaginatedMetaInternal = {
  page: WritableSignal<number>;

  pageSize: WritableSignal<number>;

  total: WritableSignal<number>;

  pages: WritableSignal<number>;
};

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
