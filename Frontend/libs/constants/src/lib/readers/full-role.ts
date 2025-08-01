import { FullRoleType } from '@frontend/models';

export const fullRoleReader: Record<FullRoleType, string> = {
  ADMIN_BASIC: 'Quản trị viên cơ bản',
  ADMIN_ADVANCED: 'Quản trị viên nâng cao',
  ADMIN_SUPER_ADVANCED: 'Siêu quản trị viên',
  LEARNER: 'Người học',
};
