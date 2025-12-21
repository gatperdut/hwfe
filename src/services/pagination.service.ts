import { Injectable, signal, WritableSignal } from '@angular/core';
import { PaginatedMeta } from '../types/paginated.type';

@Injectable()
export class PaginationService {
  public page: WritableSignal<number> = signal<number>(0);

  public pageSize: WritableSignal<number> = signal<number>(10);

  public meta: WritableSignal<PaginatedMeta> = signal<PaginatedMeta>({} as PaginatedMeta);
}
