import { Injectable, signal } from '@angular/core';
import { PaginatedMetaInternal } from '../types/paginated.type';
import { Pagination } from '../types/pagination.type';

@Injectable()
export class PaginationService {
  public meta: PaginatedMetaInternal = {
    page: signal<number>(0),
    pageSize: signal<number>(10),
    total: signal<number>(0),
    pages: signal<number>(0),
  };

  public toPagination(): Pagination {
    return {
      page: this.meta.page(),
      pageSize: this.meta.pageSize(),
    };
  }
}
