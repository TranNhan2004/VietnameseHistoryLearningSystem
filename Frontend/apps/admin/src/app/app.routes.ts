import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ContestsComponent } from './pages/contests/contests.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  authenticatedGuard,
  notAuthenticatedGuard,
} from '@frontend/angular-libs';
import { LessonsOuterComponent } from './pages/lessons-outer/lessons-outer.component';
import { AddHistoricalPeriodComponent } from './pages/add-historical-period/add-historical-period.component';
import { HistoricalPeriodDetailsComponent } from './pages/historical-period-details/historical-period-details.component';
import { EditHistoricalPeriodComponent } from './pages/edit-historical-period/edit-historical-period.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
  {
    path: 'auth',
    canActivate: [notAuthenticatedGuard],
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: SidebarLayoutComponent,
    canActivate: [authenticatedGuard],
    children: [
      { path: 'accounts', component: AccountsComponent },
      { path: 'contests', component: ContestsComponent },
      { path: 'lessons-outer', component: LessonsOuterComponent },
      {
        path: 'historical-periods',
        children: [
          {
            path: 'add',
            component: AddHistoricalPeriodComponent,
          },
          {
            path: ':id',
            component: HistoricalPeriodDetailsComponent,
          },
          {
            path: ':id/edit',
            component: EditHistoricalPeriodComponent,
          },
        ],
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
