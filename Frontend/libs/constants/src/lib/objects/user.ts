import {
  AdminResponse,
  BaseUserResponse,
  LearnerResponse,
} from '@frontend/models';

export const initialBaseUserResponse: BaseUserResponse = {
  id: '',
  userName: '',
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  avatarUrl: null,
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialAdminResponse: AdminResponse = {
  ...initialBaseUserResponse,
  adminLevel: 'BASIC',
};

export const initialLearnerResponse: LearnerResponse = {
  ...initialBaseUserResponse,
  rank: 'BEGINNER',
  point: 0,
  bestScore: null,
  worstScore: null,
};
