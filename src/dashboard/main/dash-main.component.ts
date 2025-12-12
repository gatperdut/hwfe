import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hwfe-dash-main',
  imports: [],
  templateUrl: './dash-main.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashMainComponent {
  public login(): void {}
}
