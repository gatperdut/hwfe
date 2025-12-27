import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { Pagination } from '../../types/pagination.type';
import { dropNullish } from '../../utils/drop-nullish';
import { CampaignAllDto } from '../dto/campaign-all.dto';
import { CampaignCreate } from '../dto/campaign-create.dto';
import { CampaignIncludeDto } from '../dto/campaign-include.dto';
import { Campaign } from '../types/campaign.type';

@Injectable({ providedIn: 'root' })
export class CampaignApiService {
  private httpClient = inject(HttpClient);

  public all(
    params: Partial<Pagination & CampaignIncludeDto & CampaignAllDto>
  ): Observable<Paginated<Campaign>> {
    return this.httpClient.get<Paginated<Campaign>>(`${environment.apiUrl}/campaigns`, {
      params: dropNullish(params),
    });
  }

  public create(userId: number, params: CampaignCreate): Observable<Campaign> {
    return this.httpClient.post<Campaign>(`${environment.apiUrl}/campaigns`, {
      userId: userId,
      ...params,
    });
  }
}
