import { bootstrapApplication } from '@angular/platform-browser';
import { Hwfe } from './hwfe/hwfe.component';
import { hwfeConfig } from './hwfe/hwfe.config';

bootstrapApplication(Hwfe, hwfeConfig).catch((err) => console.error(err));
