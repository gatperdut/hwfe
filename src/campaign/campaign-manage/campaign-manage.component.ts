import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hwfe-campaign-manage',
  imports: [],
  templateUrl: './campaign-manage.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignManageComponent {
  constructor() {
    console.log('HOYE');
  }
}
