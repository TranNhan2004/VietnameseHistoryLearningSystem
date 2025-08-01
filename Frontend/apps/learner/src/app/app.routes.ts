import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  authenticatedGuard,
  notAuthenticatedGuard,
} from '@frontend/angular-libs';
import { authRoutes } from './routes/auth.routes';
import { lessonRoutes } from './routes/lesson.routes';
import { contestRoutes } from './routes/contest.routes';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { chatBotRoutes } from './routes/chat-bot.routes';

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
    children: [...authRoutes],
  },
  {
    path: 'reset-password',
    canActivate: [notAuthenticatedGuard],
    component: ResetPasswordComponent,
  },
  {
    path: '',
    component: SidebarLayoutComponent,
    canActivate: [authenticatedGuard],
    children: [
      ...contestRoutes,
      ...lessonRoutes,
      ...chatBotRoutes,
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
