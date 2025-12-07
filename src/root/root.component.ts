import { Component, signal } from '@angular/core';

@Component({
  selector: 'hwfe-root',
  imports: [],
  templateUrl: './root.component.html',
  styles: [],
})
export class Root {
  protected readonly title = signal('hwfe');
}
