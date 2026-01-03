import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hwfe-campaign',
  imports: [RouterModule],
  templateUrl: './campaign.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignComponent {
  constructor() {
    console.log('HEYA');
  }
}
