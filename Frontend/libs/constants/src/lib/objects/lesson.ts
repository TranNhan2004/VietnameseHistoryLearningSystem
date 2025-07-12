import { HistoricalPeriodResponse, LessonResponse } from '@frontend/models';

export const initialHistoricalPeriodResponse: HistoricalPeriodResponse = {
  id: '',
  name: '',
  startYear: 0,
  endYear: 0,
};

export const initialLessonResponse: LessonResponse = {
  id: '',
  title: '',
  description: '',
  adminId: '',
  historicalPeriodId: '',
  videoUrl: '',
  paragraphs: [],
  images: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
