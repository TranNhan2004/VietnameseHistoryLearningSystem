import { Route } from '@angular/router';
import { AccountsComponent } from '../pages/accounts/accounts.component';
import { permissionGuard } from '@frontend/angular-libs';
import { FullRoleType } from '@frontend/models';

export const accountRoutes: Route[] = [
  {
    path: 'accounts',
    canActivate: [permissionGuard],
    component: AccountsComponent,
    data: {
      accessOnly: [
        'ADMIN_SUPER_ADVANCED',
        'ADMIN_ADVANCED',
      ] satisfies FullRoleType[],
    },
  },
];
