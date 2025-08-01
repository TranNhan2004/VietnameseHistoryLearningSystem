import { Learner } from '@frontend/models';

export const rankReader: Record<Learner['rank'], string> = {
  BEGINNER: 'Sơ cấp',
  INTERMEDIATE: 'Trung cấp',
  ADVANCED: 'Cao cấp',
  EXPERT: 'Chuyên gia',
};
