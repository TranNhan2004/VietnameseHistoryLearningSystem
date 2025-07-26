import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationHelpers } from '@frontend/utils';
import { FullRoleType } from '@frontend/models';
import { ROLE } from '../tokens/tokens';
import { PermissionService } from '../services/fe/permission.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const injectedRole = inject(ROLE);
  const permissionService = inject(PermissionService);
  const accessOnly = route.data['accessOnly'] as FullRoleType[];
  const fullRole = AuthenticationHelpers.getUserInfo(injectedRole)
    ?.fullRole as FullRoleType;

  if (accessOnly.includes(fullRole)) {
    permissionService.reset();
  } else {
    permissionService.deny();
  }

  return true;
};
