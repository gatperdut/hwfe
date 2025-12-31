import { Injectable } from '@angular/core';
import { CampaignCreateDto } from '../dto/campaign-create.dto';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  public new(): CampaignCreateDto {
    return {
      name: '',
    };
  }
}
