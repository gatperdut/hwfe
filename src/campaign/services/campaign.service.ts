import { Injectable } from '@angular/core';
import { CampaignCreate } from '../dto/campaign-create.dto';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  public new(): CampaignCreate {
    return {
      name: '',
    };
  }
}
