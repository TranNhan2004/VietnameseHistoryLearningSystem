import { CreateTime, Id, UpdateTime } from './abstracts.model';
import { FullRoleType } from './authentication.model';

export interface BaseUser {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | null;
}

export interface Admin extends BaseUser {
  adminLevel: 'BASIC' | 'ADVANCED' | 'SUPER_ADVANCED';
}

export interface Learner extends BaseUser {
  rank: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  point: number;
  bestScore: number | null;
  worstScore: number | null;
}

export interface BaseUserResponse extends Id, CreateTime, UpdateTime {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  fullRole: FullRoleType;
  active: boolean;
  dateOfBirth: Date | string | null;
  avatarUrl: string | null;
  lastLogin: Date | string | null;
}

export interface AdminResponse extends BaseUserResponse {
  adminLevel: 'BASIC' | 'ADVANCED' | 'SUPER_ADVANCED';
}

export interface LearnerResponse extends BaseUserResponse {
  rank: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  point: number;
  bestScore: number | null;
  worstScore: number | null;
}

export interface AvatarResponse {
  avatarUrl: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateUserInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | null;
}

export interface ResetPassword {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}
