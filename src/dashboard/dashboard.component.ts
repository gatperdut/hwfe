import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'hwfe-dashboard',
  imports: [CommonModule, MatTabsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public authService = inject(AuthService);
}
