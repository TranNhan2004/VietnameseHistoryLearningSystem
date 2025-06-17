import { Admin, BaseUser, Learner } from '@frontend/models';

export const initialBaseUser: BaseUser = {
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

export const initialAdmin: Admin = {
  ...initialBaseUser,
  adminLevel: 'BASIC',
};

export const initialLearner: Learner = {
  ...initialBaseUser,
  rank: 'BEGINNER',
  point: 0,
  bestScore: null,
  worstScore: null,
};
