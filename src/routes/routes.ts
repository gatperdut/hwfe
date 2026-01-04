import { Routes } from '@angular/router';
import { AuthLoginComponent } from '../auth/login/auth-login.component';
import { AuthRegisterComponent } from '../auth/register/auth-register.component';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { CampaignManageComponent } from '../campaign/campaign-manage/campaign-manage.component';
import { CampaignComponent } from '../campaign/campaign.component';
import { CampaignAllComponent } from '../dashboard/campaign-all/campaign-all.component';
import { CharacterAllComponent } from '../dashboard/character-all/character-all.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserAllComponent } from '../dashboard/user-all/user-all.component';
import { UserCampaignsComponent } from '../dashboard/user-campaigns/user-campaigns.component';
import { UserCharactersComponent } from '../dashboard/user-characters/user-characters.component';

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
          // TODO characters-all and campaigns-all: admin-only
          {
            path: 'characters-all',
            component: CharacterAllComponent,
          },
          {
            path: 'campaigns-all',
            component: CampaignAllComponent,
          },
          {
            path: 'characters',
            component: UserCharactersComponent,
          },
          {
            path: 'campaigns',
            component: UserCampaignsComponent,
          },
        ],
      },
      {
        path: 'campaign/:campaignId',
        component: CampaignComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'manage',
          },
          {
            path: 'manage',
            component: CampaignManageComponent,
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
