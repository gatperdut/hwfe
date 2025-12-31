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
import { CharacterClasses } from '../../character/types/character-class.type';
import { PaginationService } from '../../services/pagination.service';
import { Paginated } from '../../types/paginated.type';
import { TypedForm } from '../../types/typed-form.type';
import { UserCampaignsDto } from '../../user/dto/user-campaigns.dto';
import { UserApiService } from '../../user/services/user-api.service';
import { UserPickerComponent } from '../../user/user-picker/user-picker.component';
import { TypeSafeMatCellDefDirective } from '../../utils/typesafe-mat-cell-def.directive';
import {
  CampaignCreateDialogResult,
  openCampaignCreateDialog,
} from '../campaign-create-dialog/campaign-create-dialog.component';
import { CampaignApiService } from '../services/campaign-api.service';
import { CampaignService } from '../services/campaign.service';
import { Campaign } from '../types/campaign.type';

@Component({
  selector: 'hwfe-user-campaigns',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TypeSafeMatCellDefDirective,
    MatButtonModule,
    UserPickerComponent,
  ],
  templateUrl: './user-campaigns.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class UserCampaignsComponent {
  public authService = inject(AuthService);
  private userApiService = inject(UserApiService);
  public paginationService = inject(PaginationService);
  private formBuilder = inject(FormBuilder);
  private matDialog = inject(MatDialog);
  private campaignService = inject(CampaignService);
  private campaignApiService = inject(CampaignApiService);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public campaigns$: Observable<Campaign[]>;

  private refresh$ = new Subject<void>();

  public columns: string[] = ['name', 'master', 'players'];

  public characterClasses = CharacterClasses;

  public formGroup: FormGroup<TypedForm<UserCampaignsDto>> = this.formBuilder.group({
    term: this.formBuilder.control('' as string | undefined, {
      nonNullable: true,
      validators: [],
    }),
    participantId: this.formBuilder.control(undefined as number | undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
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
      this.refresh$.pipe(startWith(undefined)),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (): Observable<Paginated<Campaign>> =>
          this.userApiService.campaigns(this.authService.user()!.id, {
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

  public create(): void {
    openCampaignCreateDialog(this.matDialog, {
      campaign: this.campaignService.new(),
    })
      .afterClosed()
      .pipe(
        switchMap((result: CampaignCreateDialogResult) => {
          if (!result) {
            return EMPTY;
          }

          return this.campaignApiService.create(this.authService.user()!.id, result);
        }),
        tap((): void => {
          this.refresh$.next();
        })
      )
      .subscribe();
  }
}
