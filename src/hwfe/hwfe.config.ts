import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const hwfeConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
