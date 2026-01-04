import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CampaignApiService } from '../campaign-aux/services/campaign-api.service';
import { Campaign } from '../campaign-aux/types/campaign.type';
import { DashboardNavService } from '../dashboard/services/dashboard-nav.service';
import { CampaignCurrentService } from './services/campaign-current.service';

@Component({
  selector: 'hwfe-campaign',
  imports: [RouterModule],
  templateUrl: './campaign.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CampaignCurrentService],
})
export class CampaignComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private campaignApiService = inject(CampaignApiService);
  private dashboardNavService = inject(DashboardNavService);
  private campaignCurrentService = inject(CampaignCurrentService);

  public loading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit(): void {
    this.campaignApiService
      .get({
        id: Number(this.activatedRoute.snapshot.paramMap.get('campaignId')),
        includeMaster: true,
        includePlayers: true,
      })
      .subscribe({
        next: (campaign: Campaign): void => {
          this.campaignCurrentService.campaign.set(campaign);

          this.loading.set(false);
        },
        error: (): void => {
          this.dashboardNavService.toCampaigns();
        },
      });
  }
}
