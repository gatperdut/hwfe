import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CampaignIncludeDto } from '../../campaign-aux/dto/campaign-include.dto';
import { Campaign } from '../../campaign-aux/types/campaign.type';
import { Character } from '../../character-aux/types/character.type';
import { WithoutIdsDto } from '../../dto/without-ids.dto';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { Pagination } from '../../types/pagination.type';
import { dropIrrelevantParams } from '../../utils/drop-irrelevant-params';
import { UserAllDto } from '../dto/user-all.dto';
import { UserAvailabilityDisplayNameDto } from '../dto/user-availability-display-name.dto';
import { UserAvailabilityEmailDto } from '../dto/user-availability-email.dto';
import { UserAvailabilityResponseDto } from '../dto/user-availability-response.dto';
import { UserCampaignsDto } from '../dto/user-campaigns.dto';
import { UserCharactersDto } from '../dto/user-characters.dto';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private httpClient = inject(HttpClient);

  public all(
    params: Partial<Pagination & WithoutIdsDto & UserAllDto>
  ): Observable<Paginated<User>> {
    return this.httpClient.get<Paginated<User>>(`${environment.apiUrl}/users`, {
      params: dropIrrelevantParams(params),
    });
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/me`);
  }

  public get(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  public availabilityEmail(params: UserAvailabilityEmailDto): Observable<boolean> {
    return this.httpClient
      .get<UserAvailabilityResponseDto>(`${environment.apiUrl}/users/availability-email`, {
        params: params,
      })
      .pipe(map((availability: UserAvailabilityResponseDto): boolean => availability.available));
  }

  public availabilityDisplayName(params: UserAvailabilityDisplayNameDto): Observable<boolean> {
    return this.httpClient
      .get<UserAvailabilityResponseDto>(`${environment.apiUrl}/users/availability-display-name`, {
        params: params,
      })
      .pipe(map((availability: UserAvailabilityResponseDto): boolean => availability.available));
  }

  public characters(
    userId: number,
    search: Partial<Pagination & UserCharactersDto>
  ): Observable<Paginated<Character>> {
    return this.httpClient.get<Paginated<Character>>(
      `${environment.apiUrl}/users/${userId}/characters`,
      {
        params: dropIrrelevantParams(search),
      }
    );
  }

  public campaigns(
    userId: number,
    params: Partial<Pagination & CampaignIncludeDto & UserCampaignsDto>
  ): Observable<Paginated<Campaign>> {
    return this.httpClient.get<Paginated<Campaign>>(
      `${environment.apiUrl}/users/${userId}/campaigns`,
      {
        params: dropIrrelevantParams(params),
      }
    );
  }
}
