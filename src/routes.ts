import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/login/auth-login.component';
import { AuthRegisterComponent } from './auth/register/auth-register.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { CharacterAllComponent } from './character/character-all/character-all.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAllComponent } from './user/user-all/user-all.component';
import { UserCharactersComponent } from './user/user-characters/user-characters.component';

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
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users',
          },
          {
            path: 'users',
            component: UserAllComponent,
          },
          {
            path: 'characters-all',
            component: CharacterAllComponent,
          },
          {
            path: 'user-characters',
            component: UserCharactersComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
