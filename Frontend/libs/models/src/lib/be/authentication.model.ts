export interface LoginRequest {
  emailOrUserName: string;
  password: string;
  role: RoleType;
}

export interface LoginResponse {
  id: string;
  email: string;
  userName: string;
  fullRole: FullRoleType;
  accessToken: string;
}

export type RoleType = 'ADMIN' | 'LEARNER';

export type FullRoleType =
  | 'ADMIN_BASIC'
  | 'ADMIN_ADVANCED'
  | 'ADMIN_SUPER_ADVANCED'
  | 'LEARNER';

export interface RefreshAccessToken {
  id: string;
  fullRole: FullRoleType;
}

export interface NewAccessTokenResponse {
  accessToken: string;
}

export interface Logout {
  fullRole: FullRoleType;
}
