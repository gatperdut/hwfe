import { Component, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { Environment } from '../environments/environment.type';

@Component({
  selector: 'hwfe-root',
  imports: [],
  templateUrl: './root.component.html',
  styles: [],
})
export class Root {
  public environment: Environment = environment;

  protected readonly title = signal('hwfe');
}
