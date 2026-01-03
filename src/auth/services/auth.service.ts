import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserApiService } from '../../user-aux/services/user-api.service';
import { User } from '../../user-aux/types/user.type';
import { UserLoginDto } from '../login/types/user-login.dto';
import { UserRegisterDto } from '../register/types/user-register.dto';
import { AuthToken } from '../types/auth-token.type';
import { AuthTokenService } from './auth-token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);
  private matSnackBar = inject(MatSnackBar);
  private authTokenService = inject(AuthTokenService);
  private userApiService = inject(UserApiService);

  public user: WritableSignal<User | null> = signal<User | null>(null);

  public register(userRegisterDto: UserRegisterDto): Observable<User> {
    return this.httpClient
      .post<AuthToken>(`${environment.apiUrl}/auth/register`, userRegisterDto)
      .pipe(
        catchError((): Observable<never> => {
          this.matSnackBar.open('Something went wrong during registration');

          return EMPTY;
        }),
        tap({
          next: (authToken: AuthToken): void => {
            this.authTokenService.set(authToken.token);
          },
        }),
        switchMap((): Observable<User> => {
          return this.userApiService.me();
        }),
        tap({
          next: (user: User): void => {
            this.user.set(user);

            this.matSnackBar.open(`Welcome, ${user.displayName}!`);
          },
        })
      );
  }

  public login(userLoginDto: UserLoginDto): Observable<User> {
    return this.httpClient.post<AuthToken>(`${environment.apiUrl}/auth/login`, userLoginDto).pipe(
      catchError((): Observable<never> => {
        this.matSnackBar.open('Incorrect credentials');

        return EMPTY;
      }),
      tap({
        next: (authToken: AuthToken): void => {
          this.authTokenService.set(authToken.token);
        },
      }),
      switchMap((): Observable<User> => {
        return this.userApiService.me();
      }),
      tap({
        next: (user: User): void => {
          this.user.set(user);

          this.matSnackBar.open(`Welcome back, ${user.displayName}!`);
        },
      })
    );
  }

  private verifyToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/auth/verify-token`, {
      token: token,
    });
  }

  public loginAuto(): Observable<User | null> {
    const token: string = this.authTokenService.get();

    if (!token) {
      return of(null);
    }

    return this.verifyToken(token).pipe(
      switchMap((): Observable<User> => {
        return this.userApiService.me();
      }),
      tap({
        next: (user: User): void => {
          this.user.set(user);

          this.matSnackBar.open(`Welcome back, ${user.displayName}!`);
        },
        error: (): void => {
          this.authTokenService.clear();

          this.matSnackBar.open('Credentials expired, login again.');
        },
      })
    );
  }

  public logout(): void {
    this.matSnackBar.open(`Farewell, ${this.user()?.displayName}!`);

    this.authTokenService.clear();

    this.user.set(null);
  }
}
