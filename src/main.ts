import { bootstrapApplication } from '@angular/platform-browser';
import { Root } from './root/root.component';
import { rootConfig } from './root/root.config';

bootstrapApplication(Root, rootConfig).catch((err) => console.error(err));
