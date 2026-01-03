import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CampaignAllDto } from '../../dashboard/campaign-all/dto/campaign-all.dto';
import { CampaignCreateDto } from '../../dashboard/campaign-create-dialog/dto/campaign-create.dto';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { Pagination } from '../../types/pagination.type';
import { dropIrrelevantParams } from '../../utils/drop-irrelevant-params';
import { CampaignIncludeDto } from '../dto/campaign-include.dto';
import { Campaign } from '../types/campaign.type';

@Injectable({ providedIn: 'root' })
export class CampaignApiService {
  private httpClient = inject(HttpClient);

  public all(
    params: Partial<Pagination & CampaignIncludeDto & CampaignAllDto>
  ): Observable<Paginated<Campaign>> {
    return this.httpClient.get<Paginated<Campaign>>(`${environment.apiUrl}/campaigns`, {
      params: dropIrrelevantParams(params),
    });
  }

  public create(masterId: number, params: CampaignCreateDto): Observable<Campaign> {
    return this.httpClient.post<Campaign>(`${environment.apiUrl}/campaigns`, {
      masterId: masterId,
      ...params,
    });
  }
}
