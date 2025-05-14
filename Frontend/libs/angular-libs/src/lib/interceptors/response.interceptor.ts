import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AuthHelpers } from '@frontend/utils';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authenticationService.refreshAccessToken().pipe(
          switchMap((newAccessToken: string) => {
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return next(clonedRequest);
          }),
          catchError((refreshError) => {
            AuthHelpers.clearAccessToken(authenticationService.getRole());
            AuthHelpers.clearUserInfo(authenticationService.getRole());
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
