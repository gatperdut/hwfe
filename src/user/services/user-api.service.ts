import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../types/user.type';
import { UserAvailability } from '../types/user-availability.type';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private httpClient: HttpClient = inject(HttpClient);

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/me`);
  }

  public availableEmail(email: string): Observable<boolean> {
    return this.httpClient
      .get<UserAvailability>(`${environment.apiUrl}/users/available-email`, {
        params: {
          email: email,
        },
      })
      .pipe(map((availability: UserAvailability): boolean => availability.available));
  }

  public availableDisplayName(displayName: string): Observable<boolean> {
    return this.httpClient
      .get<UserAvailability>(`${environment.apiUrl}/users/available-display-name`, {
        params: {
          displayName: displayName,
        },
      })
      .pipe(map((availability: UserAvailability): boolean => availability.available));
  }
}
