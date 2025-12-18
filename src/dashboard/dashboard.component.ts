import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hwfe-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public login(): void {}
}
