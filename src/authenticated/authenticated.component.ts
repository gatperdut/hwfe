import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthNavService } from '../auth/services/auth-nav.service';
import { AuthTokenService } from '../auth/services/auth-token.service';
import { AuthService } from '../auth/services/auth.service';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'hwfe-authenticated',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './authenticated.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticatedComponent implements OnInit {
  private authTokenService = inject(AuthTokenService);
  private socketService = inject(SocketService);
  public authService = inject(AuthService);
  private authNavService = inject(AuthNavService);

  public ngOnInit(): void {
    this.socketService.connect(this.authTokenService.get());
  }

  public logout(): void {
    this.authService.logout();

    this.socketService.disconnect();

    this.authNavService.toLogin();
  }
}
