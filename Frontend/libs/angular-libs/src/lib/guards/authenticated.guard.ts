import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/be/authentication.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
