import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, switchMap, tap } from 'rxjs';
import { CampaignPlayer } from '../../campaign-aux/types/campaign-player.type';
import { UserApiService } from '../../user-aux/services/user-api.service';
import { User } from '../../user-aux/types/user.type';
import { UserPickerComponent } from '../../user-aux/user-picker/user-picker.component';
import { CampaignCurrentService } from '../services/campaign-current.service';

@Component({
  selector: 'hwfe-campaign-manage',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    UserPickerComponent,
  ],
  templateUrl: './campaign-manage.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignManageComponent {
  public campaignCurrentService = inject(CampaignCurrentService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private userApiService = inject(UserApiService);

  public userIdFormControl: FormControl<number | undefined> = this.formBuilder.control(
    undefined as number | undefined,
    {
      nonNullable: true,
      validators: [],
    }
  );

  constructor() {
    this.userIdFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(
          (userId: number | undefined): Observable<User> =>
            this.userApiService.get(userId as number)
        ),
        tap((user: User): void => {
          console.log(user);
        })
      )
      .subscribe();
  }

  public withoutIds(): number[] {
    return [
      this.campaignCurrentService.campaign()!.masterId,
      ...this.campaignCurrentService
        .campaign()!
        .players!.map((campaignPlayer: CampaignPlayer): number => campaignPlayer.userId),
    ];
  }
}
