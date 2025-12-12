import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { NavService } from '../services/nav.service';
import { UserApiService } from '../user/services/user-api.service';
import { User } from '../user/types/user.type';

@Component({
  selector: 'hwfe-root',
  imports: [RouterModule, MatProgressSpinnerModule],
  templateUrl: './root.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userApiService: UserApiService = inject(UserApiService);
  private navService: NavService = inject(NavService);

  public loading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit(): void {
    this.authService
      .loginAuto()
      .pipe(
        catchError((): Observable<never> => {
          console.log('Autologin error.');

          this.loading.set(false);

          this.navService.authLogin();

          return EMPTY;
        }),
        switchMap((valid: boolean): Observable<User | never> => {
          if (!valid) {
            console.log('Autologin failed');

            this.loading.set(false);

            this.navService.authLogin();

            return EMPTY;
          }

          return this.userApiService.me();
        }),
        tap((): void => {
          this.loading.set(false);

          this.navService.dashMain();
        })
      )
      .subscribe();
  }
}
