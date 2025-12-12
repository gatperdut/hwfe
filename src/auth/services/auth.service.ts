import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRegisterDto } from '../types/user-register-dto.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  public register(data: UserRegisterDto) {
    return this.httpClient.post(`${environment.apiUrl}/auth/register`, data);
  }
}
