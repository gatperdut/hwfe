import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { RootComponent } from './root/root.component';

const applicationConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      [
        // TODO
      ],
      withEnabledBlockingInitialNavigation()
    ),
  ],
};

bootstrapApplication(RootComponent, applicationConfig).catch((err) => {
  console.error(err);
});
