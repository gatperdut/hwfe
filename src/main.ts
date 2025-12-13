import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RootComponent } from './root/root.component';
import { routes } from './routes';
import { AlwaysErrorStateMatcher } from './utils/forms/always.error-state-matcher';

const applicationConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHotToastConfig(),
    { provide: ErrorStateMatcher, useClass: AlwaysErrorStateMatcher },
  ],
};

bootstrapApplication(RootComponent, applicationConfig).catch((err) => {
  console.error(err);
});
