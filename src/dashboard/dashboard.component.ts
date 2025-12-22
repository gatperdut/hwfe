import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NavService } from '../services/nav.service';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'hwfe-dashboard',
  imports: [CommonModule, MatButtonModule, MatTabsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public authService: AuthService = inject(AuthService);
  private socketService: SocketService = inject(SocketService);
  private navService: NavService = inject(NavService);

  public logout(): void {
    this.authService.logout();

    this.socketService.disconnect();

    this.navService.toAuthLogin();
  }
}
