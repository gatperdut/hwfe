import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { PaginationService } from '../../services/pagination.service';
import { SocketUsersService } from '../../socket/socket-users.service';
import { Paginated } from '../../types/paginated.type';
import { TypedForm } from '../../types/typed-form.type';
import { TypeSafeMatCellDefDirective } from '../../utils/typesafe-mat-cell-def.directive';
import { UserApiService } from '../services/user-api.service';
import { User } from '../types/user.type';
import { UserAllFilter } from './types/user-all-filter.type';

@Component({
  selector: 'hwfe-user-all',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TypeSafeMatCellDefDirective,
  ],
  templateUrl: './user-all.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class UserAllComponent {
  private userApiService = inject(UserApiService);
  public paginationService = inject(PaginationService);
  private formBuilder = inject(FormBuilder);
  private socketUsersService = inject(SocketUsersService);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public users$: Observable<User[]>;

  public columns: string[] = ['displayName', 'email', 'admin'];

  public formGroup: FormGroup<TypedForm<UserAllFilter>> = this.formBuilder.group({
    term: this.formBuilder.control('', {
      nonNullable: true,
      validators: [],
    }),
  });

  constructor() {
    this.users$ = combineLatest([
      toObservable(this.paginationService.meta.page).pipe(
        startWith(this.paginationService.meta.page())
      ),
      this.formGroup.valueChanges.pipe(startWith(this.formGroup.value), debounceTime(500)),
      this.socketUsersService.users$,
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (values: [number, Partial<UserAllFilter>, User[]]): Observable<Paginated<User>> =>
          this.userApiService
            .all({
              ...this.paginationService.toPagination(),
              ...this.formGroup.value,
            })
            .pipe(
              tap((response: Paginated<User>): void => {
                response.items.forEach((user: User): void => {
                  const socketUser: User | undefined = values[2].find(
                    (someSocketUser: User): boolean => user.id === someSocketUser.id
                  );

                  if (!socketUser) {
                    user._socketIds = [];

                    return;
                  }

                  user._socketIds = socketUser._socketIds.slice();
                });
              })
            )
      ),
      tap((response: Paginated<User>): void => {
        this.paginationService.meta.total.set(response.meta.total);

        this.paginationService.meta.pages.set(response.meta.pages);
      }),
      map((response: Paginated<User>): User[] => {
        return response.items;
      }),
      shareReplay()
    );
  }
}
