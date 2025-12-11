import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthRegisterComponent } from '../auth/register/auth-register.component';
import { environment } from '../environments/environment';
import { Environment } from '../environments/environment.type';

@Component({
  selector: 'hwfe-root',
  imports: [AuthRegisterComponent],
  templateUrl: './root.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent {
  public environment: Environment = environment;
}
