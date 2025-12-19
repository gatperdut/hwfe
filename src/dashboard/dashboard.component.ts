import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/services/auth.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'hwfe-dashboard',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public authService: AuthService = inject(AuthService);
  private navService: NavService = inject(NavService);

  public logout(): void {
    this.authService.logout();

    this.navService.toAuthLogin();
  }
}
