import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationHelpers } from '@frontend/utils';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const accessToken = AuthenticationHelpers.getAccessToken(
    authenticationService.getRole()
  );
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return next(req);
};
