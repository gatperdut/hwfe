import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './root/root.component';

const applicationConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};

bootstrapApplication(RootComponent, applicationConfig).catch((err) => {
  console.error(err);
});
