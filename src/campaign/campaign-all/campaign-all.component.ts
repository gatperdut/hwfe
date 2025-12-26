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
import { CampaignAllSearchDto } from '../dto/campaign-all-search.dto';
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

  public columns: string[] = ['name'];

  public formGroup: FormGroup<TypedForm<CampaignAllSearchDto>> = this.formBuilder.group({
    term: this.formBuilder.control('' as string | undefined, {
      nonNullable: true,
      validators: [],
    }),
    masterId: this.formBuilder.control(undefined as number | undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
    this.campaigns$ = combineLatest([
      toObservable(this.paginationService.meta.page).pipe(
        startWith(this.paginationService.meta.page())
      ),
      this.formGroup.valueChanges.pipe(startWith(this.formGroup.value), debounceTime(500)),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (): Observable<Paginated<Campaign>> =>
          this.campaignApiService.all({
            ...this.paginationService.toPagination(),
            ...this.formGroup.value,
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
