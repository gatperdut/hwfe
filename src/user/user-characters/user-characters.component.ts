import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  combineLatest,
  debounceTime,
  EMPTY,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import {
  CharacterCreateDialogResult,
  openCharacterCreateDialog,
} from '../../character/character-create-dialog/character-create-dialog.component';
import { CharacterApiService } from '../../character/services/character-api.service';
import { CharacterService } from '../../character/services/character.service';
import { CharacterClass, CharacterClasses } from '../../character/types/character-class.type';
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
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TypeSafeMatCellDefDirective,
    MatButtonModule,
  ],
  templateUrl: './user-characters.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class UserCharactersComponent {
  private authService = inject(AuthService);
  private userApiService = inject(UserApiService);
  public paginationService = inject(PaginationService);
  private formBuilder = inject(FormBuilder);
  private matDialog = inject(MatDialog);
  private characterService = inject(CharacterService);
  private characterApiService = inject(CharacterApiService);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public characters$: Observable<Character[]>;

  private refresh$ = new Subject<void>();

  public columns: string[] = ['name', 'class'];

  public characterClasses = CharacterClasses;

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
      this.refresh$.pipe(startWith(undefined)),
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

  public create(): void {
    openCharacterCreateDialog(this.matDialog, {
      character: this.characterService.new(),
    })
      .afterClosed()
      .pipe(
        switchMap((result: CharacterCreateDialogResult) => {
          if (!result) {
            return EMPTY;
          }

          return this.characterApiService.create(this.authService.user()!.id, result);
        }),
        tap((): void => {
          this.refresh$.next();
        })
      )
      .subscribe();
  }
}
