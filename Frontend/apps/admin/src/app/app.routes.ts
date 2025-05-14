import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ContestsComponent } from './pages/contests/contests.component';
import { LoginComponent } from './pages/login/login.component';
import { HasAuthLayoutComponent } from './layouts/has-auth-layout/has-auth-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  authenticatedGuard,
  notAuthenticatedGuard,
} from '@frontend/angular-libs';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [notAuthenticatedGuard],
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: HasAuthLayoutComponent,
    canActivate: [authenticatedGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'contests', component: ContestsComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', pathMatch: 'full', component: NotFoundComponent },
    ],
  },
];
