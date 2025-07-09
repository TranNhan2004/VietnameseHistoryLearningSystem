import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FullRoleType,
  LoginRequest,
  LoginResponse,
  Logout,
  NewAccessTokenResponse,
  RefreshAccessToken,
  RoleType,
} from '@frontend/models';
import { AuthenticationHelpers } from '@frontend/utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ROLE, WEB_API_URL } from '../../tokens/tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string,
    @Inject(ROLE) private role: RoleType
  ) {}

  getRole() {
    return this.role;
  }

  login(data: LoginRequest) {
    return this.httpClient.post<LoginResponse>(
      `${this.webApiUrl}auth/login`,
      data
    );
  }

  refreshAccessToken(): Observable<string> {
    const userInfo = AuthenticationHelpers.getUserInfo(this.role);
    if (userInfo) {
      const data: RefreshAccessToken = {
        id: userInfo.id,
        fullRole: userInfo.fullRole,
      };
      return this.httpClient
        .post<NewAccessTokenResponse>(
          `${this.webApiUrl}auth/token/refresh`,
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

  logout(fullRole: FullRoleType) {
    const role: RoleType = fullRole.includes('ADMIN') ? 'ADMIN' : 'LEARNER';
    const data: Logout = { fullRole: fullRole };
    AuthenticationHelpers.clearUserInfo(role);
    AuthenticationHelpers.clearAccessToken(role);
    return this.httpClient.post(`${this.webApiUrl}auth/logout`, data);
  }
}
