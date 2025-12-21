import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { PaginationService } from '../../services/pagination.service';
import { Paginated } from '../../types/paginated.type';
import { UserApiService } from '../services/user-api.service';
import { User } from '../types/user.type';

@Component({
  selector: 'hwfe-user-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class UserListComponent {
  private userApiService: UserApiService = inject(UserApiService);
  public paginationService: PaginationService = inject(PaginationService);

  public users$: Observable<User[]>;

  public columns: string[] = ['displayName', 'email'];

  constructor() {
    this.users$ = combineLatest([toObservable(this.paginationService.page)]).pipe(
      switchMap(() => this.userApiService.all()),
      tap((response: Paginated<User>): void => {
        this.paginationService.meta.set({
          page: this.paginationService.page(),
          pages: response.meta.pages,
          pageSize: this.paginationService.pageSize(),
          total: response.meta.total,
        });
      }),
      map((response: Paginated<User>): User[] => {
        return response.items;
      })
    );
  }
}
