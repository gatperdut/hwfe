import { Injectable, signal, WritableSignal } from '@angular/core';
import { Campaign } from '../../campaign-aux/types/campaign.type';

@Injectable()
export class CampaignCurrentService {
  public campaign: WritableSignal<Campaign | null> = signal<Campaign | null>(null);
}
