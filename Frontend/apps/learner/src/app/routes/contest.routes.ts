import { Route } from '@angular/router';
import { ContestsComponent } from '../pages/contests/contests.component';
import { DoContestComponent } from '../pages/do-contest/do-contest.component';

export const contestRoutes: Route[] = [
  {
    path: 'contests',
    children: [
      {
        path: '',
        component: ContestsComponent,
      },
      {
        path: ':id',
        component: DoContestComponent,
      },
    ],
  },
];
