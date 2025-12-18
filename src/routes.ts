import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/login/auth-login.component';
import { AuthRegisterComponent } from './auth/register/auth-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'register',
    component: AuthRegisterComponent,
  },
  {
    path: 'login',
    component: AuthLoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '*',
    redirectTo: 'login',
  },
];
