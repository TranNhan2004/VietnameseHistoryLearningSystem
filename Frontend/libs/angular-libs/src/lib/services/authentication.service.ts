import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequestType,
  LoginResponseType,
  NewAccessTokenResponseType,
  RefreshAccessTokenType,
  RoleType,
} from '@frontend/models';
import { WEB_API_URL } from '@frontend/constants';
import { AuthenticationHelpers } from '@frontend/utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const ROLE = new InjectionToken<RoleType>('ROLE');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ROLE) private role: RoleType
  ) {}

  getRole() {
    return this.role;
  }

  login(data: LoginRequestType) {
    return this.httpClient.post<LoginResponseType>(
      `${WEB_API_URL}auth/login`,
      data
    );
  }

  refreshAccessToken(): Observable<string> {
    const userInfo = AuthenticationHelpers.getUserInfo(this.role);
    if (userInfo) {
      const data: RefreshAccessTokenType = {
        id: userInfo.id,
        fullRole: userInfo.fullRole,
      };
      return this.httpClient
        .post<NewAccessTokenResponseType>(
          `${WEB_API_URL}auth/token/refresh`,
          data
        )
        .pipe(
          switchMap((res) => {
            AuthenticationHelpers.saveAccessToken(res.accessToken, this.role);
            return new Observable<string>((observer) => {
              observer.next(res.accessToken);
              observer.complete();
            });
          })
        );
    }
    return new Observable((observer) => {
      observer.error('User info not found');
    });
  }

  isLoggedIn() {
    return AuthenticationHelpers.getUserInfo(this.role) !== null;
  }
}
