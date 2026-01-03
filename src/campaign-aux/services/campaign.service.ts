import { Injectable } from '@angular/core';
import { CampaignCreateDto } from '../../dashboard/campaign-create-dialog/dto/campaign-create.dto';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  public new(): CampaignCreateDto {
    return {
      name: '',
    };
  }
}
