import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthTokenService } from '../auth/services/auth-token.service';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'hwfe-authenticated',
  imports: [RouterModule],
  templateUrl: './authenticated.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticatedComponent implements OnInit {
  private authTokenService = inject(AuthTokenService);
  private socketService = inject(SocketService);

  public ngOnInit(): void {
    this.socketService.connect(this.authTokenService.get());
  }
}
