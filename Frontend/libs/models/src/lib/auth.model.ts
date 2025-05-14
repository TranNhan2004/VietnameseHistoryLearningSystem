export type LoginRequestType = {
  emailOrUserName: string;
  password: string;
  role: RoleType;
};

export type LoginResponseType = {
  id: string;
  email: string;
  userName: string;
  fullRole: FullRoleType;
  accessToken: string;
};

export type RoleType = 'ADMIN' | 'LEARNER';

export type FullRoleType =
  | 'ADMIN_BASIC'
  | 'ADMIN_ADVANCED'
  | 'ADMIN_SUPER_ADVANCED'
  | 'LEARNER';

export type RefreshAccessTokenType = Pick<LoginResponseType, 'id' | 'fullRole'>;
export type LogoutType = RefreshAccessTokenType;
