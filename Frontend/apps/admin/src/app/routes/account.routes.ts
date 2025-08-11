import { Route } from '@angular/router';
import { AccountsComponent } from '../pages/accounts/accounts.component';
import { CreateAdminAccountComponent } from '../pages/create-admin-account/create-admin-account.component';

export const accountRoutes: Route[] = [
  {
    path: 'accounts',
    children: [
      {
        path: '',
        component: AccountsComponent,
      },
      {
        path: 'add',
        component: CreateAdminAccountComponent,
      },
    ],
  },
];
