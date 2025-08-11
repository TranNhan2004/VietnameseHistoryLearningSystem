import { LoginComponent } from '../pages/login/login.component';
import { Route } from '@angular/router';
import { SignupComponent } from '../pages/signup/signup.component';

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
