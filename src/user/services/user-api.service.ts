import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../../character/types/character.type';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { Pagination } from '../../types/pagination.type';
import { dropNullish } from '../../utils/drop-nullish';
import { UserAllDto } from '../dto/user-all.dto';
import { UserAvailabilityDisplayNameDto } from '../dto/user-availability-display-name.dto';
import { UserAvailabilityEmailDto } from '../dto/user-availability-email.dto';
import { UserAvailabilityResponseDto } from '../dto/user-availability-response.dto';
import { UserCharactersDto } from '../dto/user-characters.dto';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private httpClient = inject(HttpClient);

  public all(params: Partial<Pagination & UserAllDto>): Observable<Paginated<User>> {
    return this.httpClient.get<Paginated<User>>(`${environment.apiUrl}/users`, {
      params: dropNullish(params),
    });
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/me`);
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
        params: dropNullish(search),
      }
    );
  }
}
