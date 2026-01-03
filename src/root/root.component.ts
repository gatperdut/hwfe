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
import { finalize, tap } from 'rxjs';
import { AuthNavService } from '../auth/services/auth-nav.service';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../user-aux/types/user.type';

@Component({
  selector: 'hwfe-root',
  imports: [RouterModule, MatProgressSpinnerModule],
  templateUrl: './root.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit {
  private authService = inject(AuthService);
  private authNavService = inject(AuthNavService);

  public loading: WritableSignal<boolean> = signal<boolean>(true);

  public ngOnInit(): void {
    this.authService
      .loginAuto()
      .pipe(
        tap({
          next: (user: User | null): void => {
            if (!user) {
              this.authNavService.toLogin();

              return;
            }
          },
          error: (): void => {
            this.authNavService.toLogin();
          },
        }),
        finalize((): void => {
          this.loading.set(false);
        })
      )
      .subscribe();
  }
}
