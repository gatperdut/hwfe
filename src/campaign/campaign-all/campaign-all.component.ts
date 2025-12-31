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
import { CampaignAllDto } from '../dto/campaign-all.dto';
import { CampaignApiService } from '../services/campaign-api.service';
import { Campaign } from '../types/campaign.type';

@Component({
  selector: 'hwfe-campaign-all',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TypeSafeMatCellDefDirective,
  ],
  templateUrl: './campaign-all.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class CampaignAllComponent {
  private campaignApiService = inject(CampaignApiService);
  public paginationService = inject(PaginationService);
  private formBuilder = inject(FormBuilder);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public campaigns$: Observable<Campaign[]>;

  public columns: string[] = ['name', 'master', 'players'];

  public formGroup: FormGroup<TypedForm<CampaignAllDto>> = this.formBuilder.group({
    term: this.formBuilder.control('' as string | undefined, {
      nonNullable: true,
      validators: [],
    }),
    participantId: this.formBuilder.control(undefined as number | undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
    // TODO when the filter is modified, set page to 1. Do the same in all such tables with filters.
    this.campaigns$ = combineLatest([
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
        (): Observable<Paginated<Campaign>> =>
          this.campaignApiService.all({
            ...this.paginationService.toPagination(),
            ...this.formGroup.value,
            includeMaster: true,
            includePlayers: true,
          })
      ),
      tap((response: Paginated<Campaign>): void => {
        this.paginationService.meta.total.set(response.meta.total);

        this.paginationService.meta.pages.set(response.meta.pages);
      }),
      map((response: Paginated<Campaign>): Campaign[] => {
        return response.items;
      }),
      shareReplay()
    );
  }
}
