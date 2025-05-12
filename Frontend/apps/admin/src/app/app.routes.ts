import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ContestsComponent } from './pages/contests/contests.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'contests', component: ContestsComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'profile', component: ProfileComponent },
];
