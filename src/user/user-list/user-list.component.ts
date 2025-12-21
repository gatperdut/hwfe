import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { combineLatest, debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { PaginationService } from '../../services/pagination.service';
import { Paginated } from '../../types/paginated.type';
import { TypedForm } from '../../types/typed-form.type';
import { TypeSafeMatCellDefDirective } from '../../utils/typesafe-mat-cell-def.directive';
import { UserApiService } from '../services/user-api.service';
import { User } from '../types/user.type';
import { UserListFilter } from './types/user-list-filter.type';

@Component({
  selector: 'hwfe-user-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TypeSafeMatCellDefDirective,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class UserListComponent {
  private userApiService: UserApiService = inject(UserApiService);
  public paginationService: PaginationService = inject(PaginationService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public users$: Observable<User[]>;

  public columns: string[] = ['displayName', 'email', 'admin'];

  public formGroup: FormGroup<TypedForm<UserListFilter>> = this.formBuilder.group({
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
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (): Observable<Paginated<User>> =>
          this.userApiService.search({
            ...this.paginationService.toPagination(),
            ...this.formGroup.getRawValue(),
          })
      ),
      tap((response: Paginated<User>): void => {
        this.paginationService.meta.total.set(response.meta.total);

        this.paginationService.meta.pages.set(response.meta.pages);
      }),
      map((response: Paginated<User>): User[] => {
        return response.items;
      })
    );
  }
}
