import { Route } from '@angular/router';
import { ContestsComponent } from '../pages/contests/contests.component';
import { CreateContestComponent } from '../pages/create-contest/create-contest.component';
import { UpdateContestComponent } from '../pages/update-contest/update-contest.component';

export const contestRoutes: Route[] = [
  {
    path: 'contests',
    children: [
      {
        path: '',
        component: ContestsComponent,
      },
      {
        path: 'add',
        component: CreateContestComponent,
      },
      {
        path: ':id/edit',
        component: UpdateContestComponent,
      },
    ],
  },
];
