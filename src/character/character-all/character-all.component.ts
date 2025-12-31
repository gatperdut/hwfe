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
import { Paginated } from '../../types/paginated.type';
import { TypedForm } from '../../types/typed-form.type';
import { TypeSafeMatCellDefDirective } from '../../utils/typesafe-mat-cell-def.directive';
import { CharacterAllDto } from '../dto/character-all.dto';
import { CharacterApiService } from '../services/character-api.service';
import { CharacterClass } from '../types/character-class.type';
import { Character } from '../types/character.type';

@Component({
  selector: 'hwfe-character-all',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TypeSafeMatCellDefDirective,
  ],
  templateUrl: './character-all.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class CharacterAllComponent {
  private characterApiService = inject(CharacterApiService);
  public paginationService = inject(PaginationService);
  private formBuilder = inject(FormBuilder);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public characters$: Observable<Character[]>;

  public columns: string[] = ['name', 'class'];

  public formGroup: FormGroup<TypedForm<CharacterAllDto>> = this.formBuilder.group({
    term: this.formBuilder.control('' as string | undefined, {
      nonNullable: true,
      validators: [],
    }),
    class: this.formBuilder.control(undefined as CharacterClass | undefined, {
      nonNullable: true,
    }),
    userId: this.formBuilder.control(undefined as number | undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
    this.characters$ = combineLatest([
      toObservable(this.paginationService.meta.page).pipe(
        startWith(this.paginationService.meta.page())
      ),
      this.formGroup.valueChanges.pipe(
        startWith(this.formGroup.value),
        debounceTime(500),
        tap((): void => {
          this.paginationService.meta.page.set(0);
        })
      ),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (): Observable<Paginated<Character>> =>
          this.characterApiService.all({
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
