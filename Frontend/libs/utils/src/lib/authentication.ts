import {
  ADMIN_ACCESS_TOKEN_COOKIE_NAME,
  ADMIN_INFO_COOKIE_NAME,
  LEARNER_ACCESS_TOKEN_COOKIE_NAME,
  LEARNER_INFO_COOKIE_NAME,
} from '@frontend/constants';
import { LoginResponse, RoleType } from '@frontend/models';
import { CookieHelpers } from './cookie';

export class AuthenticationHelpers {
  private static getUserInfoCookieName(role: RoleType) {
    return role === 'ADMIN' ? ADMIN_INFO_COOKIE_NAME : LEARNER_INFO_COOKIE_NAME;
  }

  private static getAccessTokenCookieName(role: RoleType) {
    return role === 'ADMIN'
      ? ADMIN_ACCESS_TOKEN_COOKIE_NAME
      : LEARNER_ACCESS_TOKEN_COOKIE_NAME;
  }

  static saveAccessToken(token: string, role: RoleType) {
    CookieHelpers.set(
      AuthenticationHelpers.getAccessTokenCookieName(role),
      token,
      900
    );
  }

  static getAccessToken(role: RoleType) {
    return CookieHelpers.get(
      AuthenticationHelpers.getAccessTokenCookieName(role)
    );
  }

  static clearAccessToken(role: RoleType) {
    CookieHelpers.delete(AuthenticationHelpers.getAccessTokenCookieName(role));
  }

  static saveUserInfo(
    data: Omit<LoginResponse, 'accessToken'>,
    role: RoleType
  ) {
    CookieHelpers.set(
      AuthenticationHelpers.getUserInfoCookieName(role),
      JSON.stringify(data),
      86400
    );
  }

  static getUserInfo(
    role: RoleType
  ): Omit<LoginResponse, 'accessToken'> | null {
    const dataStr = CookieHelpers.get(
      AuthenticationHelpers.getUserInfoCookieName(role)
    );
    return dataStr ? JSON.parse(dataStr) : null;
  }

  static clearUserInfo(role: RoleType) {
    CookieHelpers.delete(AuthenticationHelpers.getUserInfoCookieName(role));
  }
}
