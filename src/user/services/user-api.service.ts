import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { UserAvailabilityDto } from '../types/user-availability.dto';
import { UserSearchDto } from '../types/user-search.dto';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private httpClient: HttpClient = inject(HttpClient);

  public search(search: UserSearchDto): Observable<Paginated<User>> {
    return this.httpClient.get<Paginated<User>>(`${environment.apiUrl}/users`, { params: search });
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/me`);
  }

  public availableEmail(email: string): Observable<boolean> {
    return this.httpClient
      .get<UserAvailabilityDto>(`${environment.apiUrl}/users/available-email`, {
        params: {
          email: email,
        },
      })
      .pipe(map((availability: UserAvailabilityDto): boolean => availability.available));
  }

  public availableDisplayName(displayName: string): Observable<boolean> {
    return this.httpClient
      .get<UserAvailabilityDto>(`${environment.apiUrl}/users/available-display-name`, {
        params: {
          displayName: displayName,
        },
      })
      .pipe(map((availability: UserAvailabilityDto): boolean => availability.available));
  }
}
