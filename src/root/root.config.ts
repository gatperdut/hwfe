import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

export const rootConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
