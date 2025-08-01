import { Route } from '@angular/router';
import { ContestsComponent } from '../pages/contests/contests.component';

export const contestRoutes: Route[] = [
  {
    path: 'contests',
    children: [
      {
        path: '',
        component: ContestsComponent,
      },
    ],
  },
];
