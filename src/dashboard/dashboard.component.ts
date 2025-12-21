import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/services/auth.service';
import { NavService } from '../services/nav.service';
import { UserListComponent } from '../user/user-list/user-list.component';

@Component({
  selector: 'hwfe-dashboard',
  imports: [CommonModule, MatButtonModule, UserListComponent],
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
