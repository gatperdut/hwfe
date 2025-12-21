import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthTokenService } from '../auth/services/auth-token.service';
import { AuthService } from '../auth/services/auth.service';
import { NavService } from '../services/nav.service';
import { SocketService } from '../services/socket.service';
import { UserListComponent } from '../user/user-list/user-list.component';

@Component({
  selector: 'hwfe-dashboard',
  imports: [CommonModule, MatButtonModule, UserListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public authService: AuthService = inject(AuthService);
  private authTokenService: AuthTokenService = inject(AuthTokenService);
  private socketService: SocketService = inject(SocketService);
  private navService: NavService = inject(NavService);

  public ngOnInit(): void {
    this.socketService.connect(this.authTokenService.get());
  }

  public logout(): void {
    this.authService.logout();

    this.navService.toAuthLogin();
  }
}
