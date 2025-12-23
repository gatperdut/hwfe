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
import { AuthService } from '../../auth/services/auth.service';
import { CharacterClass } from '../../character/types/character-class.type';
import { Character } from '../../character/types/character.type';
import { PaginationService } from '../../services/pagination.service';
import { Paginated } from '../../types/paginated.type';
import { TypedForm } from '../../types/typed-form.type';
import { TypeSafeMatCellDefDirective } from '../../utils/typesafe-mat-cell-def.directive';
import { UserCharactersDto } from '../dto/user-characters.dto';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'hwfe-user-characters',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TypeSafeMatCellDefDirective,
  ],
  templateUrl: './user-characters.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class UserCharactersComponent {
  private authService: AuthService = inject(AuthService);
  private userApiService: UserApiService = inject(UserApiService);
  public paginationService: PaginationService = inject(PaginationService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public characters$: Observable<Character[]>;

  public columns: string[] = ['name', 'class'];

  public formGroup: FormGroup<TypedForm<UserCharactersDto>> = this.formBuilder.group({
    term: this.formBuilder.control('' as string | undefined, {
      nonNullable: true,
      validators: [],
    }),
    class: this.formBuilder.control(undefined as CharacterClass | undefined, {
      nonNullable: true,
      validators: [],
    }),
  });

  constructor() {
    this.characters$ = combineLatest([
      toObservable(this.paginationService.meta.page).pipe(
        startWith(this.paginationService.meta.page())
      ),
      this.formGroup.valueChanges.pipe(startWith(this.formGroup.value), debounceTime(500)),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (): Observable<Paginated<Character>> =>
          this.userApiService.characters(this.authService.user()!.id, {
            ...this.paginationService.toPagination(),
            ...this.formGroup.value,
          })
      ),
      tap((response: Paginated<Character>): void => {
        this.paginationService.meta.total.set(response.meta.total);

        this.paginationService.meta.pages.set(response.meta.pages);
      }),
      map((response: Paginated<Character>): Character[] => {
        return response.items;
      }),
      shareReplay()
    );
  }
}
