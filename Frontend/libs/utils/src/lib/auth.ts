import {
  ADMIN_ACCESS_TOKEN_CKNAME,
  ADMIN_INFO_CKNAME,
  LEARNER_ACCESS_TOKEN_CKNAME,
  LEARNER_INFO_CKNAME,
} from '@frontend/constants';
import { LoginResponseType, RoleType } from '@frontend/models';
import { CookieHelpers } from './cookie';

export class AuthHelpers {
  private static getUserInfoCkName(role: RoleType) {
    return role === 'ADMIN' ? ADMIN_INFO_CKNAME : LEARNER_INFO_CKNAME;
  }

  private static getAccessTokenCkName(role: RoleType) {
    return role === 'ADMIN'
      ? ADMIN_ACCESS_TOKEN_CKNAME
      : LEARNER_ACCESS_TOKEN_CKNAME;
  }

  static saveAccessToken(token: string, role: RoleType) {
    CookieHelpers.set(AuthHelpers.getAccessTokenCkName(role), token, 900);
  }

  static getAccessToken(role: RoleType) {
    return CookieHelpers.get(AuthHelpers.getAccessTokenCkName(role));
  }

  static clearAccessToken(role: RoleType) {
    CookieHelpers.delete(AuthHelpers.getAccessTokenCkName(role));
  }

  static saveUserInfo(
    data: Omit<LoginResponseType, 'accessToken'>,
    role: RoleType
  ) {
    CookieHelpers.set(
      AuthHelpers.getUserInfoCkName(role),
      JSON.stringify(data),
      86400
    );
  }

  static getUserInfo(
    role: RoleType
  ): Omit<LoginResponseType, 'accessToken'> | null {
    const dataStr = CookieHelpers.get(AuthHelpers.getUserInfoCkName(role));
    return dataStr ? JSON.parse(dataStr) : null;
  }

  static clearUserInfo(role: RoleType) {
    CookieHelpers.delete(AuthHelpers.getUserInfoCkName(role));
  }
}
