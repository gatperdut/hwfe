import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLoginDto } from '../login/types/user-login-dto.type';
import { UserRegisterDto } from '../register/types/user-register-dto.type';
import { AuthToken } from '../types/auth-token.type';
import { AuthTokenService } from './auth-token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private authTokenService: AuthTokenService = inject(AuthTokenService);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  public register(userRegisterDto: UserRegisterDto): Observable<AuthToken> {
    return this.httpClient
      .post<AuthToken>(`${environment.apiUrl}/auth/register`, userRegisterDto)
      .pipe(
        tap((authToken: AuthToken): void => {
          this.authTokenService.set(authToken.token);
        })
      );
  }

  public login(userLoginDto: UserLoginDto): Observable<AuthToken> {
    return this.httpClient.post<AuthToken>(`${environment.apiUrl}/auth/login`, userLoginDto).pipe(
      catchError((): Observable<never> => {
        this.matSnackBar.open('Incorrect credentials');

        return EMPTY;
      }),
      tap((authToken: AuthToken): void => {
        this.authTokenService.set(authToken.token);
      })
    );
  }

  private verifyToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/auth/verify-token`, {
      token: token,
    });
  }

  public loginAuto(): Observable<boolean> {
    const token: string = this.authTokenService.get();

    if (!token) {
      return of(false);
    }

    return this.verifyToken(token).pipe(
      tap({
        next: (valid: boolean): void => {
          if (!valid) {
            console.log('Autologin failed.');
          }
        },
        error: (): void => {
          console.log('Autologin error.');
        },
      })
    );
  }
}
